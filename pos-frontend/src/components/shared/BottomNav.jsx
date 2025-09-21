import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
  };

  return (
    <div className="hidden md:block">
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF]">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-2 px-2 py-2 sm:gap-3 sm:px-4 xl:justify-around">
          <button
            onClick={() => navigate("/")}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-[20px] font-bold sm:h-14 xl:h-16 ${
              isActive("/") ? "bg-[#FF5733] text-[#f5f5f5]" : "text-[#212529]"
            } xl:w-[300px] xl:flex-none`}
          >
            <FaHome className="inline" size={20} /> <p>Inicio</p>
          </button>
          <button
            onClick={() => navigate("/orders")}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-[20px] font-bold sm:h-14 xl:h-16 ${
              isActive("/orders")
                ? "bg-[#FF5733] text-[#f5f5f5]"
                : "text-[#212529]"
            } xl:w-[300px] xl:flex-none`}
          >
            <MdOutlineReorder className="inline" size={20} /> <p>Pedidos</p>
          </button>
          <button
            onClick={() => navigate("/tables")}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-[20px] font-bold sm:h-14 xl:h-16 ${
              isActive("/tables")
                ? "bg-[#FF5733] text-[#f5f5f5]"
                : "text-[#212529]"
            } xl:w-[300px] xl:flex-none`}
          >
            <MdTableBar className="inline" size={20} /> <p>Mesas</p>
          </button>
          <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[20px] font-bold text-[#ababab] sm:h-14 xl:h-16 xl:w-[300px] xl:flex-none">
            <CiCircleMore className="inline" size={20} /> <p>Mas</p>
          </button>
        </div>

        <button
          disabled={isActive("/tables") || isActive("/menu")}
          onClick={openModal}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#212529] text-[#f5f5f5] rounded-full p-4 flex items-center justify-center shadow-lg"
        >
          <BiSolidDish size={32} />
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Crear Orden">
          <div>
            <label className="block text-[#212529] mb-2 text-sm font-medium">
              Nombre del cliente
            </label>
            <div className="flex items-center rounded-lg p-3 px-4 border border-yellow-500 bg-[#FFFFFF]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Ingrese el nombre del cliente"
                className="bg-transparent flex-1 text-[#212529] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#212529] mb-2 mt-3 text-sm font-medium">
              Telefono
            </label>
            <div className="flex items-center rounded-lg p-3 px-4 border border-yellow-500 bg-[#FFFFFF]">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="+591-9999999"
                className="bg-transparent flex-1 text-[#212529] focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 mt-3 text-sm font-medium text-[#212529]">
              Cantidad de Personas
            </label>
            <div className="flex items-center justify-between border border-yellow-500 bg-[#FFFFFF] px-4 py-3 rounded-lg">
              <button onClick={decrement} className="text-[#FF5733] text-2xl">
                &minus;
              </button>
              <span className="text-[#212529]">{guestCount} Personas</span>
              <button onClick={increment} className="text-[#FF5733] text-2xl">
                &#43;
              </button>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-[#F6B100] text-[#212529] rounded-lg py-3 mt-8 hover:bg-yellow-700"
          >
            Crear Orden
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default BottomNav;
