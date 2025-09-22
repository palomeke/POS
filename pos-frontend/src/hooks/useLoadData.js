import { useDispatch } from "react-redux";
import { getUserData } from "../https";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getStoredUser, persistUserSession } from "../utils/offlineStorage";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreFromCache = () => {
      const storedUser = getStoredUser();
      if (!storedUser) return false;

      dispatch(setUser(storedUser));
      return true;
    };

    const fetchUser = async () => {
      const isOffline =
        typeof navigator !== "undefined" && navigator.onLine === false;

      if (isOffline) {
        const restored = restoreFromCache();
        if (!restored) {
          dispatch(removeUser());
          navigate("/auth");
        }
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await getUserData();
        const { _id, name, email, phone, role } = data.data;
        const userPayload = { _id, name, email, phone, role };
        dispatch(setUser(userPayload));
        persistUserSession(userPayload);
      } catch (error) {
        const restored = restoreFromCache();
        if (!restored) {
          dispatch(removeUser());
          navigate("/auth");
        }
        console.error("No se pudo cargar al usuario", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return isLoading;
};

export default useLoadData;
