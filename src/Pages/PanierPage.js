import React, { useContext, useState } from "react";
import CarouselSection from "./../components/CarouselSection";
import ProductSection from "./../components/ProductSection";
import FormSection from "./../components/FormSection";
import DeliverySection from "./../components/DeliverySection";
import SummarySection from "./../components/SummarySection";
import Header from "./../components/Header";
import { CartContext } from "./../components/CartContext";
import "./Panier.css";

const PanierPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(() => {
    const initialQuantities = {};
    cart.forEach((id) => {
      initialQuantities[id] = 1; // Quantité par défaut : 1
    });
    return initialQuantities;
  });

  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const pricePerItem = 50;

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
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

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((productId) => productId !== id));
  };

  return (
    <body>
      <Header />

      <div className="cart-container">
        {cart.map((id) => (
          <div key={id} className="cart-item">
            {/* Section Carousel */}
            <CarouselSection
              id={id}
              quantity={quantities[id]}
              onQuantityChange={(newQuantity) => handleQuantityChange(id, newQuantity)}
              onRemoveFromCart={handleRemoveFromCart} // Pass function here
            />

            {/* Sections Product associées */}
            <div className="product-section-list">
              {Array.from({ length: quantities[id] || 0 }, (_, index) => (
                <ProductSection key={`${id}-${index}`} index={index} id={id} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <DeliverySection onDeliveryChange={handleDeliveryChange} />
      <SummarySection
        cart={cart}
        quantities={quantities}
        pricePerItem={pricePerItem}
        deliveryPrice={deliveryPrice}
      />
      <FormSection />
    </body>
  );
};

export default PanierPage;