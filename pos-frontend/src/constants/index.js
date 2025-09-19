import butterChicken from "../assets/images/butter-chicken-4.jpg";
import palakPaneer from "../assets/images/Saag-Paneer-1.jpg";
import biryani from "../assets/images/hyderabadibiryani.jpg";
import masalaDosa from "../assets/images/masala-dosa.jpg";
import choleBhature from "../assets/images/chole-bhature.jpg";
import rajmaChawal from "../assets/images/rajma-chawal-1.jpg";
import paneerTikka from "../assets/images/paneer-tika.webp";
import gulabJamun from "../assets/images/gulab-jamun.webp";
import pooriSabji from "../assets/images/poori-sabji.webp";
import roganJosh from "../assets/images/rogan-josh.jpg";

import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";

export const popularDishes = [
  {
    id: 1,
    image: butterChicken,
    name: "Butter Chicken",
    numberOfOrders: 250,
  },
  {
    id: 2,
    image: palakPaneer,
    name: "Palak Paneer",
    numberOfOrders: 190,
  },
  {
    id: 3,
    image: biryani,
    name: "Hyderabadi Biryani",
    numberOfOrders: 300,
  },
  {
    id: 4,
    image: masalaDosa,
    name: "Masala Dosa",
    numberOfOrders: 220,
  },
  {
    id: 5,
    image: choleBhature,
    name: "Chole Bhature",
    numberOfOrders: 270,
  },
  {
    id: 6,
    image: rajmaChawal,
    name: "Rajma Chawal",
    numberOfOrders: 180,
  },
  {
    id: 7,
    image: paneerTikka,
    name: "Paneer Tikka",
    numberOfOrders: 210,
  },
  {
    id: 8,
    image: gulabJamun,
    name: "Gulab Jamun",
    numberOfOrders: 310,
  },
  {
    id: 9,
    image: pooriSabji,
    name: "Poori Sabji",
    numberOfOrders: 140,
  },
  {
    id: 10,
    image: roganJosh,
    name: "Rogan Josh",
    numberOfOrders: 160,
  },
];

export const tables = [
  { id: 1, name: "Table 1", status: "Booked", initial: "AM", seats: 4 },
  { id: 2, name: "Table 2", status: "Available", initial: "MB", seats: 6 },
  { id: 3, name: "Table 3", status: "Booked", initial: "JS", seats: 2 },
  { id: 4, name: "Table 4", status: "Available", initial: "HR", seats: 4 },
  { id: 5, name: "Table 5", status: "Booked", initial: "PL", seats: 3 },
  { id: 6, name: "Table 6", status: "Available", initial: "RT", seats: 4 },
  { id: 7, name: "Table 7", status: "Booked", initial: "LC", seats: 5 },
  { id: 8, name: "Table 8", status: "Available", initial: "DP", seats: 5 },
  { id: 9, name: "Table 9", status: "Booked", initial: "NK", seats: 6 },
  { id: 10, name: "Table 10", status: "Available", initial: "SB", seats: 6 },
  { id: 11, name: "Table 11", status: "Booked", initial: "GT", seats: 4 },
  { id: 12, name: "Table 12", status: "Available", initial: "JS", seats: 6 },
  { id: 13, name: "Table 13", status: "Booked", initial: "EK", seats: 2 },
  { id: 14, name: "Table 14", status: "Available", initial: "QN", seats: 6 },
  { id: 15, name: "Table 15", status: "Booked", initial: "TW", seats: 3 },
];

export const startersItem = [
  {
    id: 1,
    name: "Paneer Tikka",
    price: 250,
    category: "Vegetarian",
    image: paneerTikka,
  },
  {
    id: 2,
    name: "Chole Bhature",
    price: 200,
    category: "Vegetarian",
    image: choleBhature,
  },
  {
    id: 3,
    name: "Samosa",
    price: 100,
    category: "Vegetarian",
    image: pooriSabji,
  },
];

export const mainCourse = [
  {
    id: 1,
    name: "Butter Chicken",
    price: 400,
    category: "Non-Vegetarian",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    price: 350,
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    price: 450,
    category: "Non-Vegetarian",
  },
  {
    id: 4,
    name: "Dal Makhani",
    price: 180,
    category: "Vegetarian",
  },
  {
    id: 5,
    name: "Kadai Paneer",
    price: 300,
    category: "Vegetarian",
  },
  {
    id: 6,
    name: "Rogan Josh",
    price: 500,
    category: "Non-Vegetarian",
  },
];

export const beverages = [
  {
    id: 1,
    name: "Masala Chai",
    price: 50,
    category: "Hot",
  },
  {
    id: 2,
    name: "Lemon Soda",
    price: 80,
    category: "Cold",
  },
  {
    id: 3,
    name: "Mango Lassi",
    price: 120,
    category: "Cold",
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 150,
    category: "Cold",
  },
  {
    id: 5,
    name: "Fresh Lime Water",
    price: 60,
    category: "Cold",
  },
  {
    id: 6,
    name: "Iced Tea",
    price: 100,
    category: "Cold",
  },
];

export const menus = [
  {
    id: 1,
    name: "Starters",
    bgColor: "#b73e3e",
    icon: "🍲",
    items: startersItem,
  },
  {
    id: 2,
    name: "Main Course",
    bgColor: "#5b45b0",
    icon: "🍛",
    items: mainCourse,
  },
  {
    id: 3,
    name: "Beverages",
    bgColor: "#7f167f",
    icon: "🍹",
    items: beverages,
  },
];

export const metricsData = [
  {
    title: "Revenue",
    value: "₹50,846.90",
    percentage: "12%",
    color: "#025cca",
    isIncrease: false,
  },
  {
    title: "Outbound Clicks",
    value: "10,342",
    percentage: "16%",
    color: "#02ca3a",
    isIncrease: true,
  },
  {
    title: "Total Customer",
    value: "19,720",
    percentage: "10%",
    color: "#f6b100",
    isIncrease: true,
  },
  {
    title: "Event Count",
    value: "20,000",
    percentage: "10%",
    color: "#be3e3f",
    isIncrease: false,
  },
];

export const itemsData = [
  {
    title: "Total Categories",
    value: "8",
    percentage: "12%",
    color: "#5b45b0",
    isIncrease: false,
  },
  {
    title: "Total Dishes",
    value: "50",
    percentage: "12%",
    color: "#285430",
    isIncrease: true,
  },
  {
    title: "Active Orders",
    value: "12",
    percentage: "12%",
    color: "#735f32",
    isIncrease: true,
  },
  { title: "Total Tables", value: "10", color: "#7f167f" },
];

export const orders = [
  {
    id: "101",
    customer: "Amrit Raj",
    status: "Ready",
    dateTime: "January 18, 2025 08:32 PM",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "John Doe",
    status: "In Progress",
    dateTime: "January 18, 2025 08:45 PM",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Emma Smith",
    status: "Ready",
    dateTime: "January 18, 2025 09:00 PM",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Chris Brown",
    status: "In Progress",
    dateTime: "January 18, 2025 09:15 PM",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];

export const buttons = [
  { label: "Add Table", icon: MdTableBar, action: "table" },
  { label: "Add Category", icon: MdCategory, action: "category" },
  { label: "Add Dishes", icon: BiSolidDish, action: "dishes" },
];
export const tabs = ["Metrics", "Orders", "Payments"];
