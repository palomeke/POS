const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    type: { type: String, default: "General" },
    image: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const menuCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "*" },
    bgColor: { type: String, default: "#f4f4f5" },
    dishes: [dishSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
