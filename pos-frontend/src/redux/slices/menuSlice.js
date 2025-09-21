import { createSlice, nanoid } from "@reduxjs/toolkit";
import { menus } from "../../constants";

const initialCategories = menus.map((menu) => ({
  id: String(menu.id),
  name: menu.name,
  bgColor: menu.bgColor ?? "#f4f4f5",
  icon: menu.icon ?? "*",
  items: menu.items.map((item) => ({
    id: `${menu.id}-${item.id}`,
    name: item.name,
    price: Number(item.price ?? 0),
    category: item.category ?? menu.name,
    image: item.image ?? null,
  })),
}));

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    categories: initialCategories,
  },
  reducers: {
    addCategory: {
      reducer(state, action) {
        state.categories.push({ ...action.payload, items: [] });
      },
      prepare({ name, bgColor, icon }) {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            bgColor: bgColor || "#f4f4f5",
            icon: icon || "*",
          },
        };
      },
    },
    addDish: {
      reducer(state, action) {
        const { categoryId, dish } = action.payload;
        const category = state.categories.find((cat) => cat.id === categoryId);
        if (category) {
          category.items.push(dish);
        }
      },
      prepare({ categoryId, name, price, image, type }) {
        return {
          payload: {
            categoryId,
            dish: {
              id: nanoid(),
              name: name.trim(),
              price: Number(price),
              category: type || "General",
              image: image || null,
            },
          },
        };
      },
    },
    removeCategory(state, action) {
      const categoryId = action.payload;
      state.categories = state.categories.filter((category) => category.id !== categoryId);
    },
    removeDish(state, action) {
      const { categoryId, dishId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (!category) {
        return;
      }
      category.items = category.items.filter((dish) => dish.id !== dishId);
    },
  },
});

export const { addCategory, addDish, removeCategory, removeDish } = menuSlice.actions;
export default menuSlice.reducer;




