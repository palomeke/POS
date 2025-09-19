import React, { useEffect, useState } from "react";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  useEffect(() => {
    document.title = "POS | Auth";
  }, []);

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-cover">
        {/* BG Image */}
        <img
          className="w-full h-full object-cover"
          src={restaurant}
          alt="Restaurant Image"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Ofrece platos deliciosos acompañados de atención cordial y un entorno
          agradable, y los clientes elegirán regresar una y otra vez."
          <br />
          <span className="block mt-4 text-yellow-400">- Pablo Chuquimia</span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="w-1/2 min-h-screen bg-[#FFFFFF] p-10">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="A pedir de boca"
            className="h-14 w-14 border-2 border-gray-700 rounded-full p-2 bg-black flex items-center justify-center"
          />
          <h1 className="text-lg font-semibold text-[#212529] tracking-wide">
            A pedir de boca
          </h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-[#212529] mb-10">
          {isRegister ? "Registro" : "Inicio de Sesion"}
        </h2>

        {/* Components */}
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#212529]">
            {isRegister ? "Ya tienes una cuenta?" : "No tienes una cuenta?"}
            <a
              onClick={() => setIsRegister(!isRegister)}
              className="text-yellow-400 font-semibold hover:underline"
              href="#"
            >
              {isRegister ? " Iniciar Sesion" : " Registrarse"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
