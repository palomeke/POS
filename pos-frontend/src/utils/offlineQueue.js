import { addOrder, updateTable } from "../https";
import {
  CACHE_KEYS,
  getCachedData,
  setCachedData,
  updateCachedData,
} from "./offlineCache";

const QUEUE_STORAGE_KEY = "pos_offline_queue_v1";

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

const readQueue = () => {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(QUEUE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("No se pudo leer la cola offline", error);
    return [];
  }
};

const writeQueue = (queue) => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error("No se pudo actualizar la cola offline", error);
  }
};

const createOfflineId = () => `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createOrderPreview = (entry, orderPayload, tableMeta) => {
  const orderDate = entry.createdAt;
  const tablePreview = tableMeta
    ? { _id: tableMeta.tableId, tableNo: tableMeta.tableNo }
    : orderPayload.table;

  return {
    _id: entry.id,
    orderDate,
    orderStatus: orderPayload.orderStatus,
    customerDetails: orderPayload.customerDetails,
    bills: orderPayload.bills,
    items: orderPayload.items,
    paymentMethod: orderPayload.paymentMethod,
    paymentData: orderPayload.paymentData,
    table: tablePreview,
    isOffline: true,
  };
};

const ensureOrdersCache = () => {
  const cached = getCachedData(CACHE_KEYS.orders);
  if (cached) return cached;

  const fallback = { data: [] };
  setCachedData(CACHE_KEYS.orders, fallback);
  return fallback;
};

const ensureTablesCache = () => {
  const cached = getCachedData(CACHE_KEYS.tables);
  if (cached) return cached;

  const fallback = { data: [] };
  setCachedData(CACHE_KEYS.tables, fallback);
  return fallback;
};

export const queueOfflineOrder = (orderPayload, { tableMeta, tableUpdatePayload } = {}) => {
  if (!orderPayload) return null;

  const entry = {
    id: createOfflineId(),
    type: "order",
    createdAt: new Date().toISOString(),
    orderPayload,
    tableUpdatePayload: tableUpdatePayload ?? null,
    tableMeta: tableMeta ?? null,
  };

  const queue = readQueue();
  queue.push(entry);
  writeQueue(queue);

  const preview = createOrderPreview(entry, orderPayload, tableMeta);

  ensureOrdersCache();
  updateCachedData(CACHE_KEYS.orders, (cached) => {
    const currentOrders = Array.isArray(cached?.data) ? cached.data : [];
    const filteredOrders = currentOrders.filter((order) => order._id !== preview._id);
    return { ...cached, data: [preview, ...filteredOrders] };
  });

  if (tableMeta?.tableId) {
    ensureTablesCache();
    updateCachedData(CACHE_KEYS.tables, (cached) => {
      const tables = Array.isArray(cached?.data) ? cached.data : [];
      if (!tables.length) return cached;

      const updatedTables = tables.map((table) => {
        if (table._id !== tableMeta.tableId) return table;
        return {
          ...table,
          status: "Booked",
          currentOrder: {
            _id: entry.id,
            customerDetails: orderPayload.customerDetails,
            orderStatus: orderPayload.orderStatus,
            isOffline: true,
          },
        };
      });

      return { ...cached, data: updatedTables };
    });
  }

  return preview;
};

const removeOfflineOrderPreview = (entry) => {
  updateCachedData(CACHE_KEYS.orders, (cached) => {
    if (!cached?.data) return cached;
    const filtered = cached.data.filter((order) => order._id !== entry.id);
    return { ...cached, data: filtered };
  });

  if (entry.tableMeta?.tableId) {
    updateCachedData(CACHE_KEYS.tables, (cached) => {
      if (!cached?.data) return cached;
      const updated = cached.data.map((table) => {
        if (table._id !== entry.tableMeta.tableId) return table;
        return {
          ...table,
          status: entry.tableUpdatePayload?.status ?? table.status,
          currentOrder:
            table.currentOrder?._id === entry.id ? undefined : table.currentOrder,
        };
      });

      return { ...cached, data: updated };
    });
  }
};

export const syncPendingOrders = async () => {
  if (!isBrowser() || !navigator.onLine) {
    return { synced: 0, failed: 0 };
  }

  const queue = readQueue();
  if (!queue.length) {
    return { synced: 0, failed: 0 };
  }

  const remaining = [];
  let synced = 0;
  let failed = 0;

  for (const entry of queue) {
    if (entry.type !== "order") {
      remaining.push(entry);
      continue;
    }

    try {
      const response = await addOrder(entry.orderPayload);
      const savedOrder = response?.data?.data;

      if (entry.tableUpdatePayload?.tableId) {
        try {
          await updateTable({
            tableId: entry.tableUpdatePayload.tableId,
            status: entry.tableUpdatePayload.status,
            orderId: savedOrder?._id ?? entry.tableUpdatePayload.orderId ?? null,
          });
        } catch (tableError) {
          console.error("No se pudo actualizar la mesa al sincronizar", tableError);
        }
      }

      removeOfflineOrderPreview(entry);
      synced += 1;
    } catch (error) {
      console.error("No se pudo sincronizar un pedido offline", error);
      remaining.push(entry);
      failed += 1;
    }
  }

  writeQueue(remaining);
  return { synced, failed };
};

export const getPendingOrders = () => readQueue();
