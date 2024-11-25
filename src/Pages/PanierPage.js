import React, { useState } from "react";
import CarouselSection from "./components/js/CarouselSection";
import ProductSection from "./components/js/ProductSection";
import FormSection from "./components/js/FormSection";
import DeliverySection from "./components/js/DeliverySection";
import SummarySection from "./components/js/SummarySection";

const PanierPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const pricePerItem = 50; // Static price per item

  const handleQuantityChange = (newQuantity) => {
    setQuantity(isNaN(newQuantity) ? 0 : newQuantity);
  };

  const handleDeliveryChange = (destination, deliveryType) => {
    let price = 0;
    if (destination === "usa") {
      price = deliveryType === "express" ? 20 : deliveryType === "overnight" ? 30 : 10;
    } else if (destination === "europe") {
      price = deliveryType === "express" ? 25 : deliveryType === "overnight" ? 40 : 15;
    } else if (destination === "asia") {
      price = deliveryType === "express" ? 30 : deliveryType === "overnight" ? 50 : 20;
    } else if (destination === "canada") {
      price = deliveryType === "express" ? 18 : deliveryType === "overnight" ? 25 : 8;
    }
    setDeliveryPrice(price);
  };

  return (
    <div>
      <div className="navbar">Panier</div>
      <CarouselSection
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
      />
      {Array.from({ length: quantity }, (_, index) => (
        <ProductSection key={index} index={index} />
      ))}
      <DeliverySection onDeliveryChange={handleDeliveryChange} />
      <SummarySection
        quantity={quantity}
        pricePerItem={pricePerItem}
        deliveryPrice={deliveryPrice}
      />
      <FormSection />
    </div>
  );
};

export default PanierPage;
