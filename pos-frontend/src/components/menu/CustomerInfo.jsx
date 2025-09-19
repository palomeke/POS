import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../utils";
const CustomerInfo = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const customerData = useSelector((state) => state.customer);
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col items-start">
        <h1 className="text-md text-[#212529 font-semibold tracking-wide]">
          {customerData.customerName || "Nombre del cliente"}
        </h1>
        <p className="text-xs text-[#212529] font-medium mt-1">
          #{customerData.orderId || "N/A"} / Comer dentro
        </p>
        <p className="text-xs text-[#212529] font-medium mt-2">
          {formatDate(dateTime)} / 08:32 PM
        </p>
      </div>
      <button className="bg-[#f6b100] p-3 text-xl font-bold text-[#212529] rounded-lg">
        {getAvatarName(customerData.customerName) || "CN"}
      </button>
    </div>
  );
};

export default CustomerInfo;
