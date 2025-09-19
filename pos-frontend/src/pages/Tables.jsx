import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";
const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });
  if (isError) {
    enqueueSnackbar("Something went wrong", { variant: "error" });
  }
  console.log(resData);
  return (
    <section className="bg-[#F8F9FA] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />

          <h1 className="text-[#212529] text-2xl font-bold tracking-wide">
            Mesas
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
            onClick={() => setStatus("booked")}
            className={`text-[#212529] text-lg ${
              status === "progress" && "bg-[#f6b100] rounded-lg px-5 py-2"
            }rounded-lg px-5 py-2 font-semibold`}
          >
            Ocupado
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 px-10 overflow-y-scroll h-[700px] scrollbar-hide">
        {resData?.data.data.map((table) => {
          return (
            <TableCard
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          );
        })}
      </div>
      Mesas
      <BottomNav />
    </section>
  );
};

export default Tables;
