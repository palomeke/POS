import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName, countOrderItems } from "../../utils";

const getStatusStyles = (status) => {
  switch (status) {
    case "Ready":
      return {
        badgeClass: "text-green-600 bg-[#2B4A3E]",
        description: "Listo para entrega",
        iconClass: "text-green-600",
      };
    case "Completed":
      return {
        badgeClass: "text-blue-600 bg-[#2e3f4a]",
        description: "Pedido entregado",
        iconClass: "text-blue-600",
      };
    default:
      return {
        badgeClass: "text-yellow-600 bg-[#4a452e]",
        description: "Orden en preparacion",
        iconClass: "text-yellow-600",
      };
  }
};

const OrderCard = ({ order, canComplete = false, onComplete, isCompleting }) => {
  const statusStyles = getStatusStyles(order.orderStatus);
  const showCompleteAction =
    canComplete && order.orderStatus === "Ready" && typeof onComplete === "function";

  const itemsCount = countOrderItems(order);
  const totalWithTax = Number(order.bills?.totalWithTax ?? 0).toFixed(2);

  const orderDateInstance = order.orderDate ? new Date(order.orderDate) : null;
  const orderCode = orderDateInstance ? Math.floor(orderDateInstance.getTime()) : "N/D";
  const formattedDate = order.createdAt ? formatDateAndTime(order.createdAt) : "-";

  return (
    <div className="w-[500px] bg-[#FFFFFF] p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-5">
        <div className="bg-[#f6b100] p-3 text-xl font-bold text-[#212529] rounded-lg">
          {getAvatarName(order.customerDetails?.name)}
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#212529] text-lg font-semibold tracking-wide">
              {order.customerDetails?.name ?? "Cliente"}
            </h1>
            <p className="text-[#212529] text-sm">#{orderCode} / Dine in</p>
            <p className="text-[#212529] text-sm">
              Mesa <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {" "}
              {order.table?.tableNo ?? "N/D"}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className={`px-2 py-1 rounded-lg font-semibold ${statusStyles.badgeClass}`}>
              {order.orderStatus === "Ready" ? (
                <FaCheckDouble className="inline mr-2" />
              ) : (
                <FaCircle className={`inline mr-2 ${statusStyles.iconClass}`} />
              )}
              {order.orderStatus}
            </p>
            <p className="text-[#212529] text-xs">
              <FaCircle className={`inline mr-2 ${statusStyles.iconClass}`} />
              {statusStyles.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-[#212529]">
        <p>{formattedDate}</p>
        <p>{itemsCount} Items</p>
      </div>
      <hr className="w-full mt-4 border-t border-gray-200" />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#212529] text-lg font-bold">Total</h1>
        <p className="text-[#212529] font-bold text-lg">Bs {totalWithTax}</p>
      </div>

      {showCompleteAction && (
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => onComplete(order)}
            disabled={isCompleting}
            className={`px-4 py-2 rounded-lg text-sm font-semibold text-white ${
              isCompleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isCompleting ? "Actualizando..." : "Marcar como completado"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;








