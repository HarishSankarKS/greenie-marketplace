"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Material } from "@/lib/mock/materials";

export interface CartItem {
  material: Material;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (material: Material, qty: number) => void;
  removeItem: (materialId: string) => void;
  updateQty: (materialId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((material: Material, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.material.id === material.id);
      if (existing) {
        return prev.map((i) =>
          i.material.id === material.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { material, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((materialId: string) => {
    setItems((prev) => prev.filter((i) => i.material.id !== materialId));
  }, []);

  const updateQty = useCallback((materialId: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.material.id === materialId ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.material.pricePerUnit * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}
