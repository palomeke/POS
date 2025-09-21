import fileteDePollo from "../assets/images/fileteDePollo.jpeg";
import hamburguesaDoble from "../assets/images/hamburguesaDoble.jpg";
import hamburguesaSimple from "../assets/images/hamburguesaSimple.jpg";
import lomito from "../assets/images/lomito.jpg";
import lomoRanchero from "../assets/images/lomoRanchero.jpg";
import milanesaPollo from "../assets/images/milanesaPollo.jpg";
import milanesaRes from "../assets/images/milanesaRes.jpg";
import salchipapa from "../assets/images/salchipapa.jpg";
import silpancho from "../assets/images/silpancho.jpg";
import silpanchoDoble from "../assets/images/silpanchoDoble.jpg";
import trancapecho from "../assets/images/trancapecho.jpg";

import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

export const tables = [
  { id: 1, name: "Mesa 1", status: "Booked", initial: "AM", seats: 4 },
  { id: 2, name: "Mesa 2", status: "Available", initial: "MB", seats: 6 },
  { id: 3, name: "Mesa 3", status: "Booked", initial: "JS", seats: 2 },
  { id: 4, name: "Mesa 4", status: "Available", initial: "HR", seats: 4 },
  { id: 5, name: "Mesa 5", status: "Booked", initial: "PL", seats: 3 },
  { id: 6, name: "Mesa 6", status: "Available", initial: "RT", seats: 4 },
  { id: 7, name: "Mesa 7", status: "Booked", initial: "LC", seats: 5 },
  { id: 8, name: "Mesa 8", status: "Available", initial: "DP", seats: 5 },
  { id: 9, name: "Mesa 9", status: "Booked", initial: "NK", seats: 6 },
  { id: 10, name: "Mesa 10", status: "Available", initial: "SB", seats: 6 },
  { id: 11, name: "Mesa 11", status: "Booked", initial: "GT", seats: 4 },
  { id: 12, name: "Mesa 12", status: "Available", initial: "JS", seats: 6 },
  { id: 13, name: "Mesa 13", status: "Booked", initial: "EK", seats: 2 },
  { id: 14, name: "Mesa 14", status: "Available", initial: "QN", seats: 6 },
  { id: 15, name: "Mesa 15", status: "Booked", initial: "TW", seats: 3 },
];

export const startersItem = [
  {
    id: 1,
    name: "Filete de pollo",
    price: 30.0,
    category: "Plato principal",
    image: "fileteDePollo",
  },
  {
    id: 2,
    name: "Hamburguesa doble",
    price: 23.0,
    category: "Plato principal",
    image: "hamburguesaDoble",
  },
  {
    id: 3,
    name: "Hamburguesa simple",
    price: 19.0,
    category: "Plato principal",
    image: "hamburguesaSimple",
  },
  {
    id: 4,
    name: "Lomito",
    price: 32.0,
    category: "Plato principal",
    image: "lomito",
  },
  {
    id: 5,
    name: "Lomo ranchero",
    price: 35.0,
    category: "Plato principal",
    image: "lomoRanchero",
  },
  {
    id: 6,
    name: "Milanesa de pollo",
    price: 30.0,
    category: "Plato principal",
    image: "milanesaPollo",
  },
  {
    id: 7,
    name: "Milanesa de res",
    price: 30.0,
    category: "Plato principal",
    image: "milanesaRes",
  },
  {
    id: 8,
    name: "Salchipapa",
    price: 17.0,
    category: "Plato principal",
    image: "salchipapa",
  },
  {
    id: 9,
    name: "Silpancho",
    price: 20.0,
    category: "Plato principal",
    image: "silpancho",
  },
  {
    id: 10,
    name: "Silpancho doble",
    price: 25.0,
    category: "Plato principal",
    image: "silpanchoDoble",
  },
  {
    id: 11,
    name: "Trancapecho",
    price: 17.0,
    category: "Plato principal",
    image: "trancapecho",
  },
];

export const mainCourse = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 400,
    category: "No Vegetariano",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    price: 350,
    category: "Vegetariano",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: 450,
    category: "No Vegetariano",
  },
  {
    id: 4,
    name: "Dal Makhani",
    price: 180,
    category: "Vegetariano",
  },
  {
    id: 5,
    name: "Kadai Paneer",
    price: 300,
    category: "Vegetariano",
  },
  {
    id: 6,
    name: "Rogan Josh",
    price: 500,
    category: "No Vegetariano",
  },
];

export const beverages = [
  {
    id: 1,
    name: "Masala Chai",
    price: 50,
    category: "Caliente",
  },
  {
    id: 2,
    name: "Lemon Soda",
    price: 80,
    category: "Frio",
  },
  {
    id: 3,
    name: "Mango Lassi",
    price: 120,
    category: "Frio",
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 150,
    category: "Frio",
  },
  {
    id: 5,
    name: "Fresh Lime Water",
    price: 60,
    category: "Frio",
  },
  {
    id: 6,
    name: "Iced Tea",
    price: 100,
    category: "Frio",
  },
];

export const menus = [
  {
    id: 1,
    name: "Entradas",
    bgColor: "#b73e3e",
    icon: "*",
    items: startersItem,
  },
  {
    id: 2,
    name: "Platos Fuertes",
    bgColor: "#5b45b0",
    icon: "*",
    items: mainCourse,
  },
  {
    id: 3,
    name: "Bebidas",
    bgColor: "#7f167f",
    icon: "*",
    items: beverages,
  },
];

export const metricsData = [
  {
    title: "Ingresos",
    value: "Bs 50,846.90",
    percentage: "12%",
    color: "#025cca",
    isIncrease: false,
  },
  {
    title: "Clicks Externos",
    value: "10,342",
    percentage: "16%",
    color: "#02ca3a",
    isIncrease: true,
  },
  {
    title: "Total de Clientes",
    value: "19,720",
    percentage: "10%",
    color: "#f6b100",
    isIncrease: true,
  },
  {
    title: "Eventos Registrados",
    value: "20,000",
    percentage: "10%",
    color: "#be3e3f",
    isIncrease: false,
  },
];

export const itemsData = [
  {
    title: "Categorias Totales",
    value: "8",
    percentage: "12%",
    color: "#5b45b0",
    isIncrease: false,
  },
  {
    title: "Platos Totales",
    value: "50",
    percentage: "12%",
    color: "#285430",
    isIncrease: true,
  },
  {
    title: "Pedidos Activos",
    value: "12",
    percentage: "12%",
    color: "#735f32",
    isIncrease: true,
  },
  { title: "Mesas Totales", value: "10", color: "#7f167f" },
];

export const orders = [
  {
    id: "101",
    customer: "Amrit Raj",
    status: "Ready",
    dateTime: "18 de enero de 2025 08:32 PM",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "John Doe",
    status: "In Progress",
    dateTime: "18 de enero de 2025 08:45 PM",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Emma Smith",
    status: "Ready",
    dateTime: "18 de enero de 2025 09:00 PM",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Chris Brown",
    status: "In Progress",
    dateTime: "18 de enero de 2025 09:15 PM",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];

export const buttons = [
  { label: "Agregar Mesa", icon: MdTableBar, action: "table" },
  { label: "Agregar Categoria", icon: MdCategory, action: "category" },
  { label: "Agregar Platos", icon: BiSolidDish, action: "dishes" },
];
export const tabs = ["Metricas", "Pedidos", "Pagos"];
