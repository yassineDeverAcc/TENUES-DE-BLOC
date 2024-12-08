import React, { useState, useEffect } from "react";
import "./../styles/Delivery.css";
import wcommunes from "./../ressources/wcommunes.txt";
import wilayas from "./../ressources/wilayas_algerie.txt";
import fraisLivraison from "./../ressources/livraison_wilaya.txt"; // Le fichier avec les frais de livraison

const DeliverySection = ({ onDeliveryChange }) => {
  const [wilayaList, setWilayaList] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [filteredCommunes, setFilteredCommunes] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [deliveryType, setDeliveryType] = useState(null); // Initialiser à null, aucun type de livraison sélectionné
  const [shippingCost, setShippingCost] = useState(null); // Ne rien afficher au début
  const [shippingData, setShippingData] = useState([]); // Données des frais de livraison

  // Charger les wilayas
  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const response = await fetch(wilayas);
        const text = await response.text();

        const wilayasData = text.split("\n").map(line => {
          const [id, name] = line.split(",").map(item => item.trim());
          return { id, name };
        });

        setWilayaList(wilayasData);
      } catch (error) {
        console.error("Erreur lors du chargement des wilayas :", error);
      }
    };

    fetchWilayas();
  }, []);

  // Charger les communes
  useEffect(() => {
    const fetchCommunes = async () => {
      try {
        const response = await fetch(wcommunes);
        const text = await response.text();

        const communesData = text
          .split("\n")
          .map(line => {
            const match = line.match(/\((\d+),\s*'([^']+)',\s*'([^']+)'\)/);
            if (match) {
              return {
                wilayaId: match[1],
                name: match[2],
                nameAr: match[3]
              };
            }
            return null;
          })
          .filter(item => item !== null);

        setCommunes(communesData);
      } catch (error) {
        console.error("Erreur lors du chargement des communes :", error);
      }
    };

    fetchCommunes();
  }, []);

  // Charger les frais de livraison
  useEffect(() => {
    const fetchShippingCosts = async () => {
      try {
        const response = await fetch(fraisLivraison);
        const text = await response.text();

        const shippingCosts = text.split("\n").map(line => {
          const [wilayaId, bureauCost, domicileCost] = line
            .replace(/[()]/g, "")
            .split(",")
            .map(item => item.trim());
          return {
            wilayaId,
            bureauCost: parseFloat(bureauCost),
            domicileCost: parseFloat(domicileCost)
          };
        });

        setShippingData(shippingCosts);
      } catch (error) {
        console.error("Erreur lors du chargement des frais de livraison :", error);
      }
    };

    fetchShippingCosts();
  }, []);

  // Mettre à jour les frais de livraison au démarrage si une wilaya et un type sont déjà sélectionnés
  useEffect(() => {
    if (selectedWilaya && deliveryType && shippingData.length > 0) {
      updateShippingCost(selectedWilaya, deliveryType);
    }
  }, [selectedWilaya, deliveryType, shippingData]); // Exécute l'effet quand ces valeurs changent

  // Gérer le changement de wilaya
  const handleWilayaChange = (e) => {
    const wilayaId = e.target.value;
    setSelectedWilaya(wilayaId);

    const relatedCommunes = communes.filter(
      commune => commune.wilayaId === wilayaId
    );
    setFilteredCommunes(relatedCommunes);

    setSelectedCommune(""); // Réinitialiser la commune
    onDeliveryChange(wilayaId, "", deliveryType);
    setShippingCost(null); // Réinitialiser les frais de livraison
  };

  // Gérer le changement de commune
  const handleCommuneChange = (e) => {
    const communeName = e.target.value;
    setSelectedCommune(communeName);
    onDeliveryChange(selectedWilaya, communeName, deliveryType);
    if (deliveryType) {
      updateShippingCost(selectedWilaya, deliveryType); // Mettre à jour les frais de livraison dès que la commune change
    }
  };

  // Gérer le changement du type de livraison
  const handleDeliveryTypeChange = (e) => {
    const type = e.target.value;
    setDeliveryType(type);
    onDeliveryChange(selectedWilaya, type); // Appel mis à jour de onDeliveryChange
    if (selectedWilaya) {
      updateShippingCost(selectedWilaya, type); // Mettre à jour les frais de livraison dès que le type change
    }
  };

  // Mettre à jour les frais de livraison en fonction de la wilaya et du type
  const updateShippingCost = (wilayaId, type) => {
    const shippingInfo = shippingData.find(item => item.wilayaId === wilayaId);
    if (shippingInfo) {
      setShippingCost(type === "bureau" ? shippingInfo.bureauCost : shippingInfo.domicileCost);
    } else {
      setShippingCost(null); // Aucun coût trouvé pour cette wilaya
    }
  };

  return (
    <div className="delivery-section">
      <h3>Paramètres de Livraison</h3>
      <div className="delivery-options">
        {/* Sélection de la Wilaya */}
        <div className="dropdown">
          <label htmlFor="wilaya">Wilaya:</label>
          <select
            id="wilaya"
            value={selectedWilaya}
            onChange={handleWilayaChange}
          >
            <option value="" disabled>Choisir Wilaya</option>
            {wilayaList.map(wilaya => (
              <option key={wilaya.id} value={wilaya.id}>
                {wilaya.id} - {wilaya.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Sélection de la Commune */}
        <div className="dropdown">
          <label htmlFor="commune">Commune:</label>
          <select
            id="commune"
            value={selectedCommune}
            onChange={handleCommuneChange}
            disabled={!filteredCommunes.length}
          >
            <option value="" disabled>Choisir Commune</option>
            {filteredCommunes.map(commune => (
              <option key={commune.name} value={commune.name}>
                {commune.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Sélection du Type de Livraison */}
        <div className="dropdown">
          <label htmlFor="delivery-type">Type de Livraison:</label>
          <select
            id="delivery-type"
            value={deliveryType || ""}
            onChange={handleDeliveryTypeChange}
            disabled={!selectedWilaya} // Désactiver tant qu'aucune wilaya n'est sélectionnée
          >
            <option value="domicile" >Domicile</option>
            <option value="bureau">Bureau</option>
            
          </select>
        </div>

        {/* Affichage des frais de livraison uniquement après que le type soit sélectionné */}
        {deliveryType && shippingCost !== null && (
          <div className="shipping-cost">
            <h4>Frais de Livraison: {shippingCost} DA</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverySection;