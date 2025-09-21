const categories = [
  {
    name: "Entradas",
    icon: "*",
    bgColor: "#b73e3e",
    dishes: [
      {
        name: "Filete de pollo",
        price: 30,
        type: "Plato principal",
        image: "fileteDePollo.jpeg",
      },
      {
        name: "Hamburguesa doble",
        price: 23,
        type: "Plato principal",
        image: "hamburguesaDoble",
      },
      {
        name: "Hamburguesa simple",
        price: 19,
        type: "Plato principal",
        image: "hamburguesaSimple",
      },
      { name: "Lomito", price: 32, type: "Plato principal", image: "lomito" },
      {
        name: "Lomo ranchero",
        price: 35,
        type: "Plato principal",
        image: "lomoRanchero",
      },
      {
        name: "Milanesa de pollo",
        price: 30,
        type: "Plato principal",
        image: "milanesaPollo",
      },
      {
        name: "Milanesa de res",
        price: 30,
        type: "Plato principal",
        image: "milanesaRes",
      },
      {
        name: "Salchipapa",
        price: 17,
        type: "Plato principal",
        image: "salchipapa",
      },
      {
        name: "Silpancho",
        price: 20,
        type: "Plato principal",
        image: "silpancho",
      },
      {
        name: "Silpancho doble",
        price: 25,
        type: "Plato principal",
        image: "silpanchoDoble",
      },
      {
        name: "Trancapecho",
        price: 17,
        type: "Plato principal",
        image: "trancapecho",
      },
    ],
  },
  {
    name: "Platos Fuertes",
    icon: "*",
    bgColor: "#5b45b0",
    dishes: [
      {
        name: "Butter Chicken",
        price: 400,
        type: "No Vegetariano",
        image: "butterChicken",
      },
      {
        name: "Paneer Butter Masala",
        price: 350,
        type: "Vegetariano",
        image: "paneerButterMasala",
      },
      {
        name: "Chicken Biryani",
        price: 450,
        type: "No Vegetariano",
        image: "chickenBiryani",
      },
      {
        name: "Dal Makhani",
        price: 180,
        type: "Vegetariano",
        image: "dalMakhani",
      },
      {
        name: "Kadai Paneer",
        price: 300,
        type: "Vegetariano",
        image: "kadaiPaneer",
      },
      {
        name: "Rogan Josh",
        price: 500,
        type: "No Vegetariano",
        image: "roganJosh",
      },
    ],
  },
  {
    name: "Bebidas",
    icon: "*",
    bgColor: "#7f167f",
    dishes: [
      { name: "Masala Chai", price: 50, type: "Caliente", image: "masalaChai" },
      { name: "Lemon Soda", price: 80, type: "Frio", image: "lemonSoda" },
      { name: "Mango Lassi", price: 120, type: "Frio", image: "mangoLassi" },
      { name: "Cold Coffee", price: 150, type: "Frio", image: "coldCoffee" },
      {
        name: "Fresh Lime Water",
        price: 60,
        type: "Frio",
        image: "freshLimeWater",
      },
      { name: "Iced Tea", price: 100, type: "Frio", image: "icedTea" },
    ],
  },
];

module.exports = { categories };
