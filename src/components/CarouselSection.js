import React from "react";
import "./../styles/Carousel.css";

const CarouselSection = ({ id, quantity, onQuantityChange, onRemoveFromCart }) => {
  // Calculer le total price
  const totalPrice = quantity * 50;

  return (
    <div className="carousel-section">
      <div className="carousel">
        <img src="https://via.placeholder.com/300x200" alt={`Product ${id}`} />
        <p>Produit ID: {id}</p> {/* Affichage de l'ID */}
      </div>
      <div className="quantity-input">
        <label htmlFor={`quantity-${id}`}>Quantité:</label>
        <input
          type="number"
          id={`quantity-${id}`}
          min="0"
          value={quantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value) || 0)}
        />
        <p>{id}</p>
      </div>
      <p>Total : {totalPrice} DA</p> {/* Affichage du total */}
      <button onClick={() => onRemoveFromCart(id)} className="remove-from-cart-btn">
        Supprimer
      </button>
    </div>
  );
};

export default CarouselSection;