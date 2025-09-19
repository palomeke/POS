import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index";
import { enqueueSnackbar } from "notistack";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

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
    <section className="bg-[#F8F9FA] h-[calc(100vh-5rem)] overflow-hidden ">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#212529] text-2xl font-bold tracking-wide">
            Mis Pedidos
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#212529] text-lg ${
              status === "all" && "bg-[#f6b100] rounded-lg px-5 py-2"
            }rounded-lg px-5 py-2 font-semibold`}
          >
            Todos
          </button>
          <button
            onClick={() => setStatus("progress")}
            className={`text-[#212529] text-lg ${
              status === "progress" && "bg-[#f6b100] rounded-lg px-5 py-2"
            }rounded-lg px-5 py-2 font-semibold`}
          >
            En progreso
          </button>
          <button
            onClick={() => setStatus("ready")}
            className={`text-[#212529] text-lg ${
              status === "ready" && "bg-[#f6b100] rounded-lg px-5 py-2"
            }rounded-lg px-5 py-2 font-semibold`}
          >
            Listos
          </button>
          <button
            onClick={() => setStatus("completed")}
            className={`text-[#212529] text-lg ${
              status === "completed" && "bg-[#f6b100] rounded-lg px-5 py-2"
            }rounded-lg px-5 py-2 font-semibold`}
          >
            Completados
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-16 py-4 overflow-y-scroll scrollbar-hide">
        {resData?.data.data.length > 0 ? (
          resData.data.data.map((order) => {
            return <OrderCard key={order._id} order={order} />;
          })
        ) : (
          <p className="col-span-3 text-gray-500">No orders available</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
