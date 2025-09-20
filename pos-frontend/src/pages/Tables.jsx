import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTables } from "../https";
import { enqueueSnackbar } from "notistack";

const filters = [
  { key: "all", label: "Todos" },
  { key: "booked", label: "Ocupado" },
  { key: "available", label: "Disponible" },
];

const matchesFilter = (status = "", filterKey) => {
  const normalizedStatus = status.toLowerCase();

  switch (filterKey) {
    case "booked":
      return normalizedStatus === "booked";
    case "available":
      return normalizedStatus === "available";
    default:
      return true;
  }
};

const Tables = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => getTables(),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong", { variant: "error" });
  }

  const tables = resData?.data?.data ?? [];
  const filteredTables = tables.filter((table) =>
    matchesFilter(table.status, statusFilter)
  );

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
      <div className="flex flex-wrap gap-5 px-10 overflow-y-scroll h-[700px] scrollbar-hide">
        {filteredTables.length > 0 ? (
          filteredTables.map((table) => (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table.currentOrder?.customerDetails?.name}
              seats={table.seats}
            />
          ))
        ) : (
          <p className="text-gray-500">No hay mesas para mostrar</p>
        )}
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;
