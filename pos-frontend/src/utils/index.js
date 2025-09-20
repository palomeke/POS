export const getBgColor = () => {
  const bgarr = [
    "#b73e3e",
    "#5b45b0",
    "#7f167f",
    "#735f32",
    "#1d2569",
    "#285430",
    "#f6b100",
    "#025cca",
    "#be3e3f",
    "#02ca3a",
  ];
  const randomBg = Math.floor(Math.random() * bgarr.length);
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const formatDate = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
    2,
    "0"
  )}, ${date.getFullYear()}`;
};

export const formatDateAndTime = (date) => {
  const dateAndTime = new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return dateAndTime;
};

export const extractOrderItems = (order = {}) => {
  const candidates = [
    order?.items,
    order?.orderItems,
    order?.itemsOrdered,
    order?.cartItems,
    order?.products,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    if (Array.isArray(candidate)) {
      if (candidate.length > 0) {
        return candidate;
      }
      continue;
    }

    if (typeof candidate === "object") {
      const values = Object.values(candidate);
      if (values.length > 0) {
        return values;
      }
    }
  }

  if (Array.isArray(order?.items)) {
    return order.items;
  }

  if (order?.items && typeof order.items === "object") {
    return Object.values(order.items);
  }

  return [];
};

export const getOrderItemLabel = (item = {}) =>
  item?.name ||
  item?.title ||
  item?.dishName ||
  item?.productName ||
  item?.itemName ||
  item?.product?.name ||
  "Item";

export const getOrderItemQuantity = (item = {}) =>
  item?.quantity ??
  item?.qty ??
  item?.count ??
  item?.quantityOrdered ??
  item?.quantityRequested ??
  1;

export const countOrderItems = (order = {}) => {
  const items = extractOrderItems(order);
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + getOrderItemQuantity(item), 0);
};

