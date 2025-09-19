import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { getBgColor } from "../utils";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [quantities, setQuantities] = useState({}); // {id: count}
  const dispatch = useDispatch();

  const increment = (id) => {
    setQuantities((prev) => {
      const count = prev[id] || 0;
      if (count >= 4) return prev;
      return { ...prev, [id]: count + 1 };
    });
  };

  const decrement = (id) => {
    setQuantities((prev) => {
      const count = prev[id] || 0;
      if (count <= 0) return prev;
      return { ...prev, [id]: count - 1 };
    });
  };

  const handleAddToCart = (item) => {
    const count = quantities[item.id] || 0;
    if (count === 0) return;

    const { name, price } = item;
    const newObj = {
      id: `${item.id}-${Date.now()}`, // serializable
      name,
      pricePerQuantity: price,
      quantity: count,
      price: price * count,
    };

    dispatch(addItems(newObj));

    // resetear cantidad solo del item agregado
    setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <div className="bg-[#F8F9FA] h-[calc(100vh-5rem)] p-4 flex flex-col items-center">
      {/* Categorías de menú */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-4 py-4 w-full max-w-6xl">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
            style={{ backgroundColor: "#F8F9FA" }}
            onClick={() => {
              setSelected(menu);
              setQuantities({});
            }}
          >
            <h1 className="text-[#212529] text-lg font-bold flex items-center gap-2">
              <span>{menu.icon}</span>
              {menu.name}
            </h1>
            <p className="text-[#212529] text-xs font-semibold">
              {menu.items.length} Items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-300 border-t my-6 w-full " />

      {/* Items de la categoría seleccionada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-20 w-full ">
        {selected?.items.map((item) => {
          const count = quantities[item.id] || 0;
          return (
            <div
              key={item.id}
              className="flex flex-col items-center p-8 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[300px]"
            >
              {/* Imagen circular */}
              <div className="relative w-30 h-30 rounded-full overflow-hidden mb-5 shadow-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nombre + botón carrito */}
              <div className="flex flex-col items-start w-full px-4 pt-8">
                <div className="flex items-start justify-between w-full">
                  <h1 className="text-[#212529] text-lg font-bold mb-4">
                    {item.name}
                  </h1>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#FFFFFF] text-[#02ca3a] p-2 rounded-lg cursor-pointer "
                  >
                    <FaShoppingCart size={20} />
                  </button>
                </div>

                {/* Precio + contador */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-[#212529] font-medium text-xs mb-2">
                      Price
                    </p>
                    <p className="text-[#FF5733] font-bold text-xs">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center w-full max-w-[120px] shadow-sm">
                    <button
                      onClick={() => decrement(item.id)}
                      className="flex-1 py-2 text-xl font-semibold bg-[#FF5733] text-white hover:bg-[#e5533d] transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="flex-1 text-center py-2 text-[#212529] bg-white text-lg font-bold">
                      {count}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="flex-1 py-2 text-xl font-semibold bg-[#FF5733] text-white hover:bg-[#e5533d] transition-colors"
                    >
                      &#43;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuContainer;
