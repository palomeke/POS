import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  canLoginOffline,
  getStoredUser,
  persistUserSession,
} from "../../utils/offlineStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigateByRole = (role) => {
    if (role === "Administrador") {
      navigate("/dashboard");
    } else if (role === "Cocina") {
      navigate("/orders");
    } else {
      navigate("/");
    }
  };

  const attemptOfflineLogin = (credentials) => {
    if (!credentials?.email || !credentials?.password) {
      enqueueSnackbar("Completa tus credenciales para iniciar sesion.", {
        variant: "warning",
      });
      return false;
    }

    const storedUser = getStoredUser();

    if (!storedUser) {
      enqueueSnackbar(
        "No hay datos guardados para iniciar sesion sin conexion. Inicia sesion en linea al menos una vez.",
        { variant: "warning" }
      );
      return false;
    }

    if (!canLoginOffline(credentials.email, credentials.password)) {
      enqueueSnackbar("Las credenciales no coinciden con la sesion almacenada.", {
        variant: "error",
      });
      return false;
    }

    dispatch(setUser(storedUser));
    enqueueSnackbar("Sesion restaurada en modo offline", { variant: "info" });
    navigateByRole(storedUser.role);
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isOffline =
      typeof navigator !== "undefined" && navigator.onLine === false;

    if (isOffline) {
      attemptOfflineLogin(formData);
      return;
    }

    loginMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (res, variables) => {
      const { data } = res;
      const { _id, name, email, phone, role } = data.data;
      const userPayload = { _id, name, email, phone, role };
      dispatch(setUser(userPayload));
      persistUserSession(userPayload, variables?.password);

      navigateByRole(role);
    },
    onError: (error, variables) => {
      const isNetworkIssue =
        (typeof navigator !== "undefined" && navigator.onLine === false) ||
        error?.code === "ERR_NETWORK";

      if (isNetworkIssue) {
        const handledOffline = attemptOfflineLogin(variables);
        if (handledOffline) return;
      }

      const message =
        error?.response?.data?.message ||
        "No se pudo iniciar sesion. Intenta nuevamente.";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-[#212729] mb-2 mt-3 text-sm font-medium">
            Email de usuario
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#F8F9FA]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su email"
              className="bg-transparent flex-1 text-[#6C757D] focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-[#212729] mb-2 mt-3 text-sm font-bold">
            Contrasena
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#F8F9FA]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contrasena"
              className="bg-transparent flex-1 text-[#212729] focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Inicio de Sesion
        </button>
      </form>
    </div>
  );
};

export default Login;
