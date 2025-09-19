import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="bg-[#FFFFFF] py-5 px-5 rounded-lg w-[50%]">
      <div className="flex items-start justify-between">
        <h1 className="text-[#212529] text-lg font-semibold tracking-wide ">
          {title}
        </h1>
        <button
          className={`${
            title === "Ganancias Totales" ? "text-[#02ca3a]" : "text-[#f6b100]"
          } p-3 rounded-lg text-[#212529] text-2xl`}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className="text-[#212529] text-4xl font-bold mt-5">
          {title === "Ganancias Totales" ? `Bs ${number}` : number}
        </h1>
        <h1 className="text-[#212529] text-lg mt-2">
          <span className="text-[#02ca3a]">{footerNum}%</span> mas que ayer{" "}
        </h1>
      </div>
    </div>
  );
};
export default MiniCard;
