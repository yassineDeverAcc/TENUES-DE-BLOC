import React, { createContext, useState, useEffect } from "react";

// Durée en millisecondes avant réinitialisation (30 minutes)
const EXPIRATION_DURATION = 30 * 60 * 1000;

// Création du contexte
export const CartContext = createContext();

// Fournisseur de contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    const storedTimestamp = localStorage.getItem("cartTimestamp");

    if (storedCart && storedTimestamp) {
      const now = Date.now();
      if (now - parseInt(storedTimestamp, 10) < EXPIRATION_DURATION) {
        return JSON.parse(storedCart);
      }
    }
    return [];
  });

  const [disabledItems, setDisabledItems] = useState(() => {
    const storedDisabledItems = localStorage.getItem("disabledItems");
    const storedTimestamp = localStorage.getItem("disabledItemsTimestamp");

    if (storedDisabledItems && storedTimestamp) {
      const now = Date.now();
      if (now - parseInt(storedTimestamp, 10) < EXPIRATION_DURATION) {
        return JSON.parse(storedDisabledItems);
      }
    }
    return [];
  });

  // Sauvegarder le panier et son horodatage dans le Local Storage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cartTimestamp", Date.now().toString());
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTimestamp");
    }
  }, [cart]);

  // Sauvegarder les éléments désactivés et leur horodatage dans le Local Storage
  useEffect(() => {
    if (disabledItems.length > 0) {
      localStorage.setItem("disabledItems", JSON.stringify(disabledItems));
      localStorage.setItem("disabledItemsTimestamp", Date.now().toString());
    } else {
      localStorage.removeItem("disabledItems");
      localStorage.removeItem("disabledItemsTimestamp");
    }
  }, [disabledItems]);

  // Réinitialiser le panier et les éléments désactivés après la durée définie
  useEffect(() => {
    const timer = setTimeout(() => {
      setCart([]);
      setDisabledItems([]);
    }, EXPIRATION_DURATION);

    return () => clearTimeout(timer); // Nettoyage pour éviter les multiples minuteries
  }, [cart, disabledItems]);

  return (
    <CartContext.Provider value={{ cart, setCart, disabledItems, setDisabledItems }}>
      {children}
    </CartContext.Provider>
  );
};