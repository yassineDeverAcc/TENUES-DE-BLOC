import React, { useState } from "react";
import "./../css/Delivery.css" ;

const DeliverySection = ({ onDeliveryChange }) => {
  const [destination, setDestination] = useState("");
  const [deliveryType, setDeliveryType] = useState("");

  const handleDestinationChange = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
    onDeliveryChange(selectedDestination, deliveryType);
  };

  const handleDeliveryTypeChange = (e) => {
    const selectedDeliveryType = e.target.value;
    setDeliveryType(selectedDeliveryType);
    onDeliveryChange(destination, selectedDeliveryType);
  };

  return (
    <div className="delivery-section">
      <h3>Paramètres de Livraison</h3>
      <div className="delivery-options">
        <div className="dropdown">
          <label htmlFor="destination">Wilaya:</label>
          <select
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="" disabled>
              Choisir Wilaya
            </option>
            <option value="usa">Oran</option>
            <option value="canada">Alger</option>
            <option value="europe">Tlemcen</option>
            <option value="asia">Constantine</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="delivery-type">Type de Livraison:</label>
          <select
            id="delivery-type"
            value={deliveryType}
            onChange={handleDeliveryTypeChange}
          >
            <option value="" disabled>
              Choisir le Type de Livraison
            </option>
            <option value="standard">Bureau</option>
            <option value="express">à Domicil</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeliverySection;
