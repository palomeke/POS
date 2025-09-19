import React, { useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";
import { useEffect } from "react";
const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrolLRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrolLRef.current) {
      scrolLRef.current.scrollTo({
        top: scrolLRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);
  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };
  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#212529] font-semibold tracking-wide">
        Detalles de Pedido
      </h1>
      <div
        className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]"
        ref={scrolLRef}
      >
        {cartData.length === 0 ? (
          <p className="text-sm text-[#212529] font-semibold flex justify-center items-center h-[380px]">
            No hay elementos en el carrito.
          </p>
        ) : (
          cartData.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#FFFFF]  rounded-lg mb-2 py-4 px-4 "
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-md text-[#212529] font-semibold tracking-wide">
                    {item.name}
                  </h1>
                  <p className="text-xs text-[#212529] font-semibold">
                    x{item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      onClick={() => handleRemove(item.id)}
                      className="text-[#FF5733] cursor-pointer "
                      size={20}
                    />
                    <FaNotesMedical
                      className="text-[#FF5733] cursor-pointer "
                      size={20}
                    />
                  </div>
                  <p className="text-xs text-[#212529] font-semibold">
                    Bs {item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
