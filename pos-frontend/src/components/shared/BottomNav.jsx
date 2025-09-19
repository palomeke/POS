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
    // send the data to store
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center font-bold ${
          isActive("/") ? "text-[#f5f5f5] bg-[#FF5733]" : "text-[#212529]"
        } w-[300px] rounded-[20px]`}
      >
        <FaHome className="inline mr-2" size={20} /> <p>Inicio</p>
      </button>
      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center font-bold ${
          isActive("/orders") ? "text-[#f5f5f5] bg-[#FF5733]" : "text-[#212529]"
        } w-[300px] rounded-[20px]`}
      >
        <MdOutlineReorder className="inline mr-2" size={20} /> <p>Pedidos</p>
      </button>
      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center font-bold ${
          isActive("/tables") ? "text-[#f5f5f5] bg-[#FF5733]" : "text-[#212529]"
        } w-[300px] rounded-[20px]`}
      >
        <MdTableBar className="inline mr-2" size={20} /> <p>Mesas</p>
      </button>
      <button className="flex items-center justify-center font-bold text-[#ababab] w-[300px]">
        <CiCircleMore className="inline mr-2" size={20} /> <p>Mas</p>
      </button>

      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 items-center"
      >
        <BiSolidDish size={40} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Crear Orden">
        <div>
          <label className="block text-[#212529] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 border border-yellow-500 bg-[#FFFFFF]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name=""
              placeholder="Ingrese el nombre del cliente"
              id=""
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
              name=""
              placeholder="+591-9999999"
              id=""
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
  );
};

export default BottomNav;
