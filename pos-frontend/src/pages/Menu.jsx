import React, { useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";
const Menu = () => {
  useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  const customerData = useSelector((state) => state.customer);
  return (
    <section className="bg-[#F8F9FA] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* Left Div */}
      <div className="flex-[3] ">
        <div className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#212529] text-2xl font-bold tracking-wide">
              Menu
            </h1>
          </div>
          <div className="flex items-center justify-around gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <MdRestaurantMenu className="text-[#212529] text-5xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-[#212529] font-semibold">
                  {customerData.customerName || "Nombre del cliente"}
                </h1>
                <p className="text-xs text-[#212529] font-medium">
                  Mesa: {customerData.table?.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>
      {/* Rigtht Div */}
      <div className="flex-[1] bg-[#FFFFFF] mt-4 mr-3 h-[780px]rounded-lg pt-2">
        {/*Custumer Info Div */}
        <CustomerInfo />
        <hr className="border-gray-300 border-t my-6 w-full" />
        {/*Cart Items Div */}
        <CartInfo />
        {/*Bill Div */}
        <Bill />
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
