'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/lib/types/database';

export interface CartItemModel {
  id: string; // Unique combination: `${product.id}-${selectedColor || 'std'}-${selectedSize || 'std'}`
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedImage?: string;
  variantPrice?: number;
  variantSalePrice?: number | null;
}

interface CartContextType {
  items: CartItemModel[];
  addItem: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedSize?: string,
    selectedImage?: string,
    variantPrice?: number,
    variantSalePrice?: number | null
  ) => void;
  removeItem: (itemIdOrProductId: string) => void;
  updateQuantity: (itemIdOrProductId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aura_pakistan_cart_v3';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemModel[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            // Ensure every item has an id
            return parsed.map((item) => ({
              ...item,
              id:
                item.id ||
                `${item.product.id}-${item.selectedColor || 'std'}-${item.selectedSize || 'std'}`,
            }));
          }
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string,
    selectedImage?: string,
    variantPrice?: number,
    variantSalePrice?: number | null
  ) => {
    const fallbackImage = product.images?.[0]?.image_url || '';
    const chosenImage = selectedImage || fallbackImage;
    const itemUniqueId = `${product.id}-${selectedColor || 'std'}-${selectedSize || 'std'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.id === itemUniqueId ||
          (i.product.id === product.id &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize)
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
                selectedImage: chosenImage || item.selectedImage,
                variantPrice: variantPrice ?? item.variantPrice,
                variantSalePrice: variantSalePrice !== undefined ? variantSalePrice : item.variantSalePrice,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          id: itemUniqueId,
          product,
          quantity: Math.min(quantity, Math.max(1, product.stock)),
          selectedColor,
          selectedSize,
          selectedImage: chosenImage,
          variantPrice,
          variantSalePrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemIdOrProductId: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => i.id !== itemIdOrProductId && i.product.id !== itemIdOrProductId
      )
    );
  };

  const updateQuantity = (itemIdOrProductId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemIdOrProductId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === itemIdOrProductId || i.product.id === itemIdOrProductId) {
          return { ...i, quantity: Math.min(quantity, i.product.stock) };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = (item.variantSalePrice ?? item.variantPrice) ?? (item.product.sale_price ?? item.product.price);
    return sum + price * item.quantity;
  }, 0);

  // Free delivery across Pakistan on orders over Rs. 5,000, otherwise flat Rs. 250
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  // Standard 5% GST
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
