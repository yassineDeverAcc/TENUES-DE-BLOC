import React from "react";
import "./../css/Summary.css" ;

const SummarySection = ({ quantity, pricePerItem, deliveryPrice }) => {
  const totalItemPrice = quantity * pricePerItem;
  const totalPrice = totalItemPrice + deliveryPrice;

  return (
    <div className="summary-section">
      <h3>Sommaire</h3>
      <p>Prix des Achats: {totalItemPrice.toFixed(2)}DA</p>
      <p>Frais de Livraison: {deliveryPrice.toFixed(2)}DA</p>
      <p className="total-price">Prix à Payer: {totalPrice.toFixed(2)}DA</p>
    </div>
  );
};

export default SummarySection;
