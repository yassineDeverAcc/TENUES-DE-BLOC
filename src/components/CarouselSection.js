import React, { useState, useEffect } from "react";
import "./../css/Carousel.css" ;

const CarouselSection = ({ quantity, onQuantityChange }) => {
  const pricePerItem = 50; // Static price per item
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(pricePerItem * quantity);
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    onQuantityChange(newQuantity);
  };

  return (
    <div className="carousel-section">
      <div className="carousel">
        <img src="https://via.placeholder.com/300x200" alt="Product" />
      </div>
      <div className="quantity-input">
        <p className="price-display">
          Prix Unitaire: {pricePerItem}DA
        </p>
        <label htmlFor="quantity">Quantité:</label>
        <input
          type="number"
          id="quantity"
          min="0"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <p className="total-price">
          Total: {totalPrice}DA
        </p>
      </div>
    </div>
  );
};

export default CarouselSection;
