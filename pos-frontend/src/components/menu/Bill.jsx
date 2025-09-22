import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import {
  addOrder,
  createOrderRazorpay,
  updateTable,
  verifyPaymentRazorpay,
} from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import Invoice from "../invoice/Invoice";
import { queueOfflineOrder } from "../../utils/offlineQueue";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bill = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 0;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState();

  const handleOfflineOrder = (orderData) => {
    const tableMeta = customerData.table
      ? {
          tableId: customerData.table.tableId,
          tableNo: customerData.table.tableNo,
        }
      : null;

    const tableUpdatePayload = customerData.table
      ? { tableId: customerData.table.tableId, status: "Booked" }
      : null;

    const offlinePreview = queueOfflineOrder(orderData, {
      tableMeta,
      tableUpdatePayload,
    });

    if (!offlinePreview) {
      enqueueSnackbar("No se pudo guardar el pedido offline", {
        variant: "error",
      });
      return;
    }

    setOrderInfo({ ...offlinePreview, paymentData: orderData.paymentData });
    setShowInvoice(true);
    dispatch(removeCustomer());
    dispatch(removeAllItems());

    queryClient.invalidateQueries(["orders"]);
    queryClient.invalidateQueries(["tables"]);

    enqueueSnackbar(
      "Pedido guardado sin conexion. Se sincronizara automaticamente al recuperar la conexion.",
      { variant: "info" }
    );
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Selecciona un metodo de pago", {
        variant: "warning",
      });

      return;
    }

    const isOffline =
      typeof navigator !== "undefined" && navigator.onLine === false;

    if (paymentMethod === "Online") {
      if (isOffline) {
        enqueueSnackbar(
          "Necesitas conexion a internet para procesar pagos en linea.",
          { variant: "warning" }
        );
        return;
      }

      try {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          enqueueSnackbar("No se pudo cargar Razorpay. Verifica tu conexion", {
            variant: "warning",
          });
          return;
        }

        const reqData = {
          amount: totalPriceWithTax.toFixed(2),
        };

        const { data } = await createOrderRazorpay(reqData);

        const options = {
          key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "RESTRO",
          description: "Pago seguro para tu pedido",
          order_id: data.order.id,
          handler: async function (response) {
            const verification = await verifyPaymentRazorpay(response);
            enqueueSnackbar(verification.data.message, { variant: "success" });

            const orderData = {
              customerDetails: {
                name: customerData.customerName,
                phone: customerData.customerPhone,
                guests: customerData.guests,
              },
              orderStatus: "In Progress",
              bills: {
                total: total,
                tax: tax,
                totalWithTax: totalPriceWithTax,
              },
              items: cartData,
              table: customerData.table.tableId,
              paymentMethod: paymentMethod,
              paymentData: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              },
            };

            setTimeout(() => {
              orderMutation.mutate(orderData);
            }, 1500);
          },
          prefill: {
            name: customerData.name,
            email: "",
            contact: customerData.phone,
          },
          theme: { color: "#025cca" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Pago fallido", {
          variant: "error",
        });
      }
    } else {
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod: paymentMethod,
      };
      if (isOffline) {
        handleOfflineOrder(orderData);
        return;
      }

      orderMutation.mutate(orderData);
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (resData) => {
      const { data } = resData.data;

      setOrderInfo(data);

      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Pedido registrado", {
        variant: "success",
      });
      setShowInvoice(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-[#212529]">Total</p>
        <h1 className="text-2xl font-bold text-[#212529]">
          Bs {totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`w-full rounded-lg px-4 py-3 font-semibold text-[#ababab] transition-colors ${
            paymentMethod === "Cash" ? "bg-[#383737]" : "bg-[#1f1f1f]"
          }`}
        >
          Efectivo
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`w-full rounded-lg px-4 py-3 font-semibold text-[#ababab] transition-colors ${
            paymentMethod === "Online" ? "bg-[#383737]" : "bg-[#1f1f1f]"
          }`}
        >
          En linea
        </button>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="mt-4 w-full rounded-lg bg-[#f6b100] px-4 py-3 text-lg font-semibold text-[#1f1f1f] hover:bg-[#dda108]"
      >
        Confirmar pedido
      </button>

      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </div>
  );
};

export default Bill;
