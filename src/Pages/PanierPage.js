import React, { useContext, useState, useEffect } from "react";
import CarouselSection from "./../components/CarouselSection";
import ProductSection from "./../components/ProductSection";
import FormSection from "./../components/FormSection";
import DeliverySection from "./../components/DeliverySection";
import SummarySection from "./../components/SummarySection";
import Header from "./../components/Header";
import { CartContext } from "./../components/CartContext";
import livraison from "./../ressources/livraison_wilaya.txt";
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

  const [deliveryPrice, setDeliveryPrice] = useState(null); // Initialisation à null
  const [selectedWilaya, setSelectedWilaya] = useState(""); // Ajout pour les wilayas
  const [deliveryType, setDeliveryType] = useState(""); // Type initialisé à une chaîne vide
  const [wilayaData, setWilayaData] = useState({}); // Stocke les données des wilayas
  const pricePerItem = 50;

  const parseWilayaData = (fileContent) => {
    const lines = fileContent.trim().split("\n");
    const data = {};

    lines.forEach((line) => {
      const match = line.match(/\((\d+),(\d+),(\d+)\)/);
      if (match) {
        const [, id, bureauPrice, domicilePrice] = match;
        data[id] = {
          bureauPrice: parseInt(bureauPrice, 10),
          domicilePrice: parseInt(domicilePrice, 10),
        };
      }
    });

    setWilayaData(data);
  };

  useEffect(() => {
    fetch(livraison)
      .then((response) => response.text())
      .then((text) => parseWilayaData(text));
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(0, newQuantity),
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((productId) => productId !== id));
  };

  const handleDeliveryChange = (wilaya, type) => {
    setSelectedWilaya(wilaya);
    setDeliveryType(type);
    let price = null;

    if (wilayaData[wilaya] && type) {
      const { bureauPrice, domicilePrice } = wilayaData[wilaya];
      price = type === "bureau" ? bureauPrice : domicilePrice;
    }

    setDeliveryPrice(price); // Met à jour les frais de livraison
  };

  return (
    <body>
      <Header />
    <div>
      
      <div>
        <div className="cart-container">
          {cart.length === 0 ? (
            <p className="empty-cart">Votre panier est vide.</p>
          ) : (
            cart.map((id) => (
              <div key={id} className="cart-item">
                <CarouselSection
                  id={id}
                  quantity={quantities[id]}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(id, newQuantity)
                  }
                  onRemoveFromCart={handleRemoveFromCart}
                />
                <div className="product-section-list">
                  {Array.from({ length: quantities[id] || 0 }, (_, index) => (
                    <ProductSection key={`${id}-${index}`} index={index} id={id} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <DeliverySection
          selectedWilaya={selectedWilaya}
          deliveryType={deliveryType}
          onDeliveryChange={handleDeliveryChange}
          wilayaData={wilayaData}
        />

        <SummarySection
          cart={cart}
          quantities={quantities}
          pricePerItem={pricePerItem}
          selectedWilaya={selectedWilaya}
          deliveryType={deliveryType}
          deliveryPrice={deliveryPrice || 0} // Assurer qu'il y a une valeur numérique même si null
        />

        <FormSection />
      </div>
    </div>
    </body>
  );
};

export default PanierPage;