import React from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrderStatus } from "../../https";
import {
  extractOrderItems,
  getOrderItemLabel,
  getOrderItemQuantity,
} from "../../utils";

const STATUS_OPTIONS = [
  { value: "In Progress", label: "En progreso" },
  { value: "Completed", label: "Completado" },
];

const LEGACY_COMPLETED_STATUSES = ["Ready", "Completado", "Completed"];

const isCompletedStatus = (status = "") =>
  LEGACY_COMPLETED_STATUSES.includes(status);

const getStatusLabel = (status = "") => {
  if (status === "Ready") return "Listo";
  if (status === "In Progress") return "En progreso";
  if (status === "Completed") return "Completado";
  return status;
};

const getDateParts = (timestamp) => {
  if (!timestamp) {
    return { date: "-", time: "-" };
  }

  const dateInstance = new Date(timestamp);

  return {
    date: dateInstance.toLocaleDateString("es-BO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    time: dateInstance.toLocaleTimeString("es-BO", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const KitchenOrders = () => {
  const queryClient = useQueryClient();

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus({ orderId, orderStatus }),
    onSuccess: (response) => {
      const updatedOrder = response?.data?.data;

      if (isCompletedStatus(updatedOrder?.orderStatus)) {
        queryClient.setQueryData(["orders"], (previousData) => {
          if (!previousData?.data?.data) return previousData;

          const remainingOrders = previousData.data.data.filter(
            (order) => order._id !== updatedOrder._id
          );

          return {
            ...previousData,
            data: {
              ...previousData.data,
              data: remainingOrders,
            },
          };
        });
      }

      enqueueSnackbar("Estado del pedido actualizado correctamente", {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      enqueueSnackbar("No se pudo actualizar el estado del pedido", {
        variant: "error",
      });
    },
  });

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Ocurrio un error al cargar los pedidos", {
      variant: "error",
    });
  }

  const orders = resData?.data?.data ?? [];
  const activeOrders = orders.filter(
    (order) => !isCompletedStatus(order.orderStatus)
  );

  const handleStatusChange = (orderId, orderStatus) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  return (
    <div className="bg-[#262626] p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#f5f5f5] text-2xl font-semibold">
          Pedidos de Cocina
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333333] text-[#ababab] uppercase text-sm">
            <tr>
              <th className="p-3 font-medium">Pedido</th>
              <th className="p-3 font-medium">Cliente</th>
              <th className="p-3 font-medium">Estado</th>
              <th className="p-3 font-medium">Fecha</th>
              <th className="p-3 font-medium">Hora</th>
              <th className="p-3 font-medium">Pedido realizado</th>
            </tr>
          </thead>
          <tbody>
            {activeOrders.length === 0 ? (
              <tr>
                <td className="p-6 text-center text-[#ababab]" colSpan={6}>
                  No hay pedidos pendientes en este momento.
                </td>
              </tr>
            ) : (
              activeOrders.map((order) => {
                const { date, time } = getDateParts(order.orderDate);
                const orderItems = extractOrderItems(order);

                const options = STATUS_OPTIONS.some(
                  (option) => option.value === order.orderStatus
                )
                  ? STATUS_OPTIONS
                  : [
                      ...STATUS_OPTIONS,
                      {
                        value: order.orderStatus,
                        label: getStatusLabel(order.orderStatus),
                      },
                    ];

                return (
                  <tr
                    key={order._id}
                    className="border-b border-[#3d3d3d] hover:bg-[#333333]"
                  >
                    <td className="p-4 whitespace-nowrap">
                      #{Math.floor(new Date(order.orderDate).getTime())}
                    </td>
                    <td className="p-4">{order.customerDetails?.name ?? "Cliente"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isCompletedStatus(order.orderStatus)
                              ? "bg-[#2e4a40] text-green-400"
                              : "bg-[#4a452e] text-yellow-400"
                          }`}
                        >
                          {getStatusLabel(order.orderStatus)}
                        </span>
                        <select
                          className="bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f6b100]"
                          value={order.orderStatus}
                          onChange={(event) =>
                            handleStatusChange(order._id, event.target.value)
                          }
                        >
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="p-4">{date}</td>
                    <td className="p-4">{time}</td>
                    <td className="p-4">
                      {orderItems.length === 0 ? (
                        <span className="text-sm text-[#ababab]">
                          Sin items registrados
                        </span>
                      ) : (
                        <ul className="space-y-1 text-sm text-[#f5f5f5]/80">
                          {orderItems.map((item, index) => (
                            <li key={`${order._id}-${index}`}>
                              {getOrderItemLabel(item)} x
                              {getOrderItemQuantity(item)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KitchenOrders;
