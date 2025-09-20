import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import Minicard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";
import { useSelector } from "react-redux";

const Home = () => {
  const { role } = useSelector((state) => state.user);
  const isCashier = role === "Cajero";

  return (
    <section
      className={`bg-[#F8F9FA] h-[calc(100vh-5rem)] overflow-hidden ${
        isCashier ? "flex flex-col items-stretch" : "flex gap-3"
      }`}
    >
      {isCashier ? (
        <div className="flex-1">
          <RecentOrders />
        </div>
      ) : (
        <>
          <div className="flex-[3] ">
            <Greetings />
            <div className="flex items-center w-full gap-3 px-8 mt-8">
              <Minicard
                title="Ganancias Totales"
                icon={<BsCashCoin />}
                number={512}
                footerNum={1.6}
              />
              <Minicard
                title="En Progreso"
                icon={<GrInProgress />}
                number={16}
                footerNum={3.6}
              />
            </div>
            <RecentOrders />
          </div>
          <div className="flex-[2]">
            <PopularDishes />
          </div>
        </>
      )}
      <BottomNav />
    </section>
  );
};

export default Home;
