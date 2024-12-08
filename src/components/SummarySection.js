import React from "react";
import "./../styles/Summary.css";

const SummarySection = ({ cart, quantities, pricePerItem, deliveryPrice }) => {
  // Calcul du prix total des articles
  const totalItemsPrice = cart.reduce(
    (acc, id) => acc + (quantities[id] || 0) * pricePerItem,
    0
  );

  // Calcul du total final (articles + livraison)
  const totalPrice = totalItemsPrice + deliveryPrice;

  return (
    <div className="summary-section">
      <h3>Résumé de la commande</h3>
      <p>Nombre d'articles : {cart.length}</p>
      <p>Prix total des articles : {totalItemsPrice} DA</p>
      <p>Frais de livraison : {deliveryPrice} DA</p>
      <p className="total-price">Total à payer : {totalPrice} DA</p>
    </div>
    
  );
};

export default SummarySection;