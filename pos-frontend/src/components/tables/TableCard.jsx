import React from "react";
import { getAvatarName, getBgColor } from "../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const STATUS_LABELS = {
  booked: "Ocupado",
  available: "Disponible",
};

const TableCard = ({ id, name, status, initials, seats }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const normalizedStatus = status?.toLowerCase() ?? "";
  const isBooked = normalizedStatus === "booked";
  const statusLabel = STATUS_LABELS[normalizedStatus] ?? status ?? "-";

  const handleClick = () => {
    if (isBooked) return;

    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({ table }));
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[300px] h-[220px] bg-white p-4 rounded-lg cursor-pointer transition-colors ${
        isBooked ? "hover:bg-[#f5f5f5]" : "hover:bg-[#edf0d4]"
      }`}
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#212529] text-xl font-semibold">
          Mesa <FaLongArrowAltRight className="text-[#212529] ml-2 inline" /> {name}
        </h1>
        <p
          className={`${
            isBooked
              ? "text-[#f5f5f5] bg-[#c0392b]"
              : "text-[#212529] bg-[#a3d977]"
          } px-2 py-1 rounded-lg font-semibold capitalize`}
        >
          {statusLabel}
        </p>
      </div>
      <div className="flex items-center justify-center my-5 mb-4">
        <h1
          className="w-14 h-14 flex items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>
      <p className="text-[#212529] text-xs px-1 font-bold">
        Asientos: <span className="text-[#212529] px-1">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
