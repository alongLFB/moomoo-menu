"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { CartItem, CartContextType } from "@/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { dish: any; quantity: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_FROM_STORAGE"; payload: { items: CartItem[] } };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { dish, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === dish.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: dish.id,
            nameZh: dish.nameZh,
            nameEn: dish.nameEn,
            price: dish.price,
            quantity,
            imageThumbnail: dish.imageThumbnail,
          },
        ],
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case "CLEAR_CART": {
      return { items: [] };
    }

    case "LOAD_FROM_STORAGE": {
      return { items: action.payload.items };
    }

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("moomoo-cart");
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        dispatch({ type: "LOAD_FROM_STORAGE", payload: { items } });
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("moomoo-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (dish: any, quantity: number) => {
    dispatch({ type: "ADD_ITEM", payload: { dish, quantity } });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
