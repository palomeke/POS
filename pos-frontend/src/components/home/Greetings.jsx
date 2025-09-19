import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Greetings = () => {
  const userData = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date) => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return ` ${String(date.getDate()).padStart(2, "0")} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;
  };
  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="flex justify-between items-center px-8 mt-5">
      <div>
        <h1 className="text-[#212529] text-2xl font-semibold">
          Buenos Dias, {userData.name || "TEST USER"}
        </h1>
      </div>
      <div>
        <h1 className="text-[#212529] text-3xl font-bold tracking-wide w-[130px">
          {formatTime(dateTime)}
        </h1>
        <p className="text-[#212529] text-sm font-semibold">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
