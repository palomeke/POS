import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";
const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }
  return (
    <div className="px-8 mt-6">
      <div className="bg-[#FFFFFF] w-full h-[450px] rounded-lg">
        <div className="flex items-center justify-between py-6 px-6">
          <h1 className="text-[#212529] text-lg font-semibold tracking-wide">
            Pedidos Recientes
          </h1>
          <a href="" className="text-[#212529] text-sm font-semibold">
            Ver Todos
          </a>
        </div>
        <div className="flex items-center border border-gray-300 focus-within:border-primary gap-4 bg-[#FFFFF] rounded-[15px] px-5 py-2 mx-8">
          <FaSearch className="text-[#212529]" />
          <input
            type="text"
            placeholder="Buscar pedidos recientes"
            className="bg-surfaceMuted outline-none text-textPrimary w-full placeholder:text-textSecondary"
          />
        </div>
        {/* Order List */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderList key={order._id} order={order} />;
            })
          ) : (
            <p className="col-span-3 text-gray-500">No orders available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
