import React from "react";
import { popularDishes } from "../../constants";
const PopularDishes = () => {
  return (
    <div className="mt-6 pr-6">
      <div className="bg-[#FFFFFF] w-full rounded-lg">
        <div className="flex items-center justify-between py-6 px-6">
          <h1 className="text-[#212529] text-lg font-semibold tracking-wide">
            Platos Populares
          </h1>
          <a href="" className="text-[#212529] text-sm font-semibold">
            View All
          </a>
        </div>
        <div className="overflow-y-scroll h-[680px] scrollbar-hide">
          {popularDishes.map((dish) => {
            return (
              // Añadimos scrollbar-hide a este div para ocultar la barra de desplazamiento
              <div
                key={dish.id}
                className="flex items-center gap-4 bg-[#F8EDEB] rounded-[15px] px-6 py-4 mt-4 mx-6 scrollbar-hide"
              >
                <h1 className="text-[#212529] text-xl  font-bold mr-4">
                  {dish.id < 10 ? `0${dish.id}` : dish.id}
                </h1>
                {/* Imagen del plato */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-[50px] h-[50px] rounded-full"
                />

                {/* Información del plato */}
                <div>
                  <h1 className="text-[#212529] font-semibold tracking-wide">
                    {dish.name}
                  </h1>
                  <p className="text-[#212529] text-sm font-semibold mt-1">
                    <span className="text-[#212529] ">Platos: </span>
                    {dish.numberOfOrders}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
