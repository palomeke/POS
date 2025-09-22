import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { syncPendingOrders } from "../utils/offlineQueue";

const useOfflineSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;

    const runSync = async () => {
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        return;
      }

      const { synced, failed } = await syncPendingOrders();
      if (!isMounted) return;

      if (synced > 0) {
        enqueueSnackbar(`Se sincronizaron ${synced} pedido(s) pendiente(s).`, {
          variant: "success",
        });
        queryClient.invalidateQueries(["orders"]);
        queryClient.invalidateQueries(["tables"]);
      }

      if (failed > 0) {
        enqueueSnackbar(
          `No se pudieron sincronizar ${failed} pedido(s). Se reintentara automaticamente.`,
          { variant: "warning" }
        );
      }
    };

    runSync();
    window.addEventListener("online", runSync);

    return () => {
      isMounted = false;
      window.removeEventListener("online", runSync);
    };
  }, [queryClient]);
};

export default useOfflineSync;
