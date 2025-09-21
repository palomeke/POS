import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isSameDay } from "../../utils";

const RecentOrders = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Ocurrio un error", { variant: "error" });
  }

  const orders = resData?.data?.data ?? [];

  const todaysOrders = useMemo(() => {
    const today = new Date();
    return orders.filter((order) => isSameDay(order.orderDate, today));
  }, [orders]);

  const filteredOrders =
    role === "Cajero"
      ? todaysOrders.filter(
          (order) =>
            order.orderStatus === "In Progress" || order.orderStatus === "Ready"
        )
      : todaysOrders;

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white/85 px-4 py-5 shadow-sm ring-1 ring-[#f1f3f5] sm:px-6 sm:py-6 xl:h-[450px] xl:rounded-lg xl:bg-[#FFFFFF] xl:shadow-none xl:ring-0">
        <div className="flex items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[#212529] text-lg font-semibold tracking-wide">
              Pedidos Recientes
            </h1>
            <p className="text-xs text-[#6c757d] sm:hidden">
              Resumen de la actividad del dia.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#212529] transition hover:bg-[#f1f3f5] sm:hidden"
              aria-label="Buscar pedidos"
            >
              <FaSearch size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="text-[#212529] text-sm font-semibold hover:underline"
            >
              Ver Todos
            </button>
          </div>
        </div>
        <div
          className={`mt-3 ${isSearchOpen ? "flex" : "hidden"} items-center gap-3 rounded-[15px] border border-gray-300 bg-[#FFFFF] px-4 py-2 focus-within:border-primary sm:mt-4 sm:flex sm:px-5`}
        >
          <FaSearch className="text-[#212529]" />
          <input
            type="text"
            placeholder="Buscar pedidos recientes"
            className="bg-surfaceMuted w-full flex-1 text-textPrimary placeholder:text-textSecondary outline-none"
          />
        </div>
        <div className="mt-4 space-y-3 overflow-y-auto pr-1 scrollbar-hide sm:max-h-80 xl:max-h-[300px] xl:px-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderList key={order._id} order={order} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No hay pedidos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
