import React, { useEffect, useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getOrders, updateOrderStatus, updateTable } from "../https/index";
import { enqueueSnackbar } from "notistack";
import KitchenOrders from "../components/orders/KitchenOrders";
import { useSelector } from "react-redux";

const KitchenOrdersPage = () => {
  return (
    <section className="bg-[#1a1a1a] min-h-[calc(100vh-5rem)] overflow-y-auto py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <KitchenOrders />
      </div>
    </section>
  );
};

const filters = [
  { key: "all", label: "Todos" },
  { key: "progress", label: "En progreso" },
  { key: "ready", label: "Listos" },
  { key: "completed", label: "Completados" },
];

const statusMatchesFilter = (orderStatus = "", filterKey) => {
  const normalizedStatus = orderStatus.toLowerCase();

  switch (filterKey) {
    case "progress":
      return normalizedStatus === "in progress" || normalizedStatus === "progress";
    case "ready":
      return normalizedStatus === "ready";
    case "completed":
      return normalizedStatus === "completed";
    default:
      return true;
  }
};

const OrdersListPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { role } = useSelector((state) => state.user);
  const isCashier = role === "Cajero";
  const queryClient = useQueryClient();

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => getOrders(),
    placeholderData: keepPreviousData,
  });

  const completeOrderMutation = useMutation({
    mutationFn: async (order) => {
      const response = await updateOrderStatus({
        orderId: order._id,
        orderStatus: "Completed",
      });

      if (order?.table?._id) {
        await updateTable({
          tableId: order.table._id,
          status: "Available",
          orderId: null,
        });
      }

      return response;
    },
    onSuccess: () => {
      enqueueSnackbar("Pedido actualizado correctamente", { variant: "success" });
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["tables"]);
    },
    onError: () => {
      enqueueSnackbar("No se pudo actualizar el estado del pedido", {
        variant: "error",
      });
    },
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const orders = resData?.data?.data ?? [];
  const filteredOrders = orders.filter((order) =>
    statusMatchesFilter(order.orderStatus, statusFilter)
  );

  const handleMarkAsCompleted = (order) => {
    completeOrderMutation.mutate(order);
  };

  return (
    <section className="bg-[#F8F9FA] h-[calc(100vh-5rem)] overflow-hidden ">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#212529] text-2xl font-bold tracking-wide">
            Mis Pedidos
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`text-[#212529] text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${
                statusFilter === key ? "bg-[#f6b100]" : "bg-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-16 py-4 overflow-y-scroll scrollbar-hide">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              canComplete={isCashier}
              onComplete={handleMarkAsCompleted}
              isCompleting={
                completeOrderMutation.isPending &&
                completeOrderMutation.variables?._id === order._id
              }
            />
          ))
        ) : (
          <p className="col-span-3 text-gray-500">No orders available</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

const Orders = () => {
  const { role } = useSelector((state) => state.user);
  const isKitchen = role === "Cocina";

  useEffect(() => {
    document.title = isKitchen ? "POS | Cocina" : "POS | Orders";
  }, [isKitchen]);

  return isKitchen ? <KitchenOrdersPage /> : <OrdersListPage />;
};

export default Orders;
