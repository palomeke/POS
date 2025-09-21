const MenuCategory = require("../models/menuCategoryModel");
const { categories: seedCategories } = require("../data/menuSeed");
const asyncHandler = require("express-async-handler");

const formatCategory = (categoryDoc) => ({
  id: categoryDoc._id.toString(),
  name: categoryDoc.name,
  icon: categoryDoc.icon,
  bgColor: categoryDoc.bgColor,
  items: (categoryDoc.dishes || []).map((dish) => ({
    id: dish._id.toString(),
    name: dish.name,
    price: dish.price,
    type: dish.type,
    image: dish.image,
  })),
});

const ensureSeedData = async () => {
  const count = await MenuCategory.countDocuments();
  if (count === 0) {
    await MenuCategory.insertMany(
      seedCategories.map((category) => ({
        name: category.name,
        icon: category.icon,
        bgColor: category.bgColor,
        dishes: category.dishes,
      }))
    );
  }
};

exports.getCategories = asyncHandler(async (req, res) => {
  await ensureSeedData();
  const categories = await MenuCategory.find();
  res.status(200).json({ status: "success", data: categories.map(formatCategory) });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, icon, bgColor } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("El nombre de la categoría es requerido");
  }

  const category = await MenuCategory.create({
    name: name.trim(),
    icon: icon?.trim() || "*",
    bgColor: bgColor || "#f4f4f5",
    dishes: [],
  });

  res
    .status(201)
    .json({ status: "success", message: "Categoría creada", data: formatCategory(category) });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const deleted = await MenuCategory.findByIdAndDelete(categoryId);

  if (!deleted) {
    res.status(404);
    throw new Error("Categoría no encontrada");
  }

  res.status(200).json({ status: "success", message: "Categoría eliminada" });
});

exports.createDish = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, price, type, image } = req.body;

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("El nombre del plato es requerido");
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    res.status(400);
    throw new Error("El precio del plato no es válido");
  }

  const category = await MenuCategory.findById(categoryId);
  if (!category) {
    res.status(404);
    throw new Error("Categoría no encontrada");
  }

  category.dishes.push({
    name: name.trim(),
    price: numericPrice,
    type: type || "General",
    image: image || null,
  });

  await category.save();

  const dish = category.dishes[category.dishes.length - 1];

  res.status(201).json({
    status: "success",
    message: "Plato agregado",
    data: {
      id: dish._id.toString(),
      categoryId: category._id.toString(),
      name: dish.name,
      price: dish.price,
      type: dish.type,
      image: dish.image,
    },
  });
});

exports.deleteDish = asyncHandler(async (req, res) => {
  const { categoryId, dishId } = req.params;
  const category = await MenuCategory.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Categoría no encontrada");
  }

  const initialLength = category.dishes.length;
  category.dishes = category.dishes.filter((dish) => dish._id.toString() !== dishId);

  if (category.dishes.length === initialLength) {
    res.status(404);
    throw new Error("Plato no encontrado");
  }

  await category.save();

  res.status(200).json({ status: "success", message: "Plato eliminado" });
});
