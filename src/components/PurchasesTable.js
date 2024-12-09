import React, { useState, useEffect } from "react";
import "./../styles/PurchasesTable.css";
import FilterSearchSection from "./FilterSearchSection"; // Assurez-vous que ce chemin est correct

const PurchasesTable = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]); // Pour les données filtrées
  const [filterState, setFilterState] = useState("tout"); // État du filtre
  const [searchQuery, setSearchQuery] = useState(""); // Requête de recherche

  // Fonction pour récupérer les données depuis l'API
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/data");
        const data = await response.json();
        setPurchases(data);
        setFilteredPurchases(data); // Initialiser les données filtrées
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchPurchases();

    const interval = setInterval(fetchPurchases, 5000); // Actualise toutes les 5 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle lorsqu'on quitte le composant
  }, []);

  // Fonction pour filtrer et chercher dans les données
  useEffect(() => {
    let updatedList = purchases;

    // Filtrer par état
    if (filterState !== "tout") {
      updatedList = updatedList.filter(
        (purchase) => purchase.etat.toLowerCase() === filterState.toLowerCase()
      );
    }

    // Chercher par ID ou Nom
    if (searchQuery.trim() !== "") {
      updatedList = updatedList.filter(
        (purchase) =>
          purchase.id.toString().includes(searchQuery) ||
          purchase.nom.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPurchases(updatedList);
  }, [filterState, searchQuery, purchases]);

  // Fonction pour gérer le changement d'état
  const validStates = ["commandé", "confirmé", "envoyé", "livré"];

  const handleStateChange = async (id, newState) => {
    if (!validStates.includes(newState)) {
      console.error("État invalide : ", newState);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5001/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ etat: newState }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Mise à jour des achats localement
        setPurchases((prevPurchases) =>
          prevPurchases.map((purchase) =>
            purchase.id === id ? { ...purchase, etat: newState } : purchase
          )
        );
      } else {
        console.error("Erreur lors de la mise à jour de l'état :", data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état :", error);
    }
  };

  return (
    <div>
      <FilterSearchSection
        filterState={filterState}
        onFilterChange={setFilterState}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <table className="purchases-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Wilaya</th>
            <th>Commune</th>
            <th>Type Livraison</th>
            <th>Frais</th>
            <th>Date</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Numéro</th>
            <th>État</th>
            <th>Changer l'état</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{purchase.wilaya}</td>
              <td>{purchase.commune}</td>
              <td>{purchase.type_livraison}</td>
              <td>{purchase.frais}</td>
              <td>{purchase.date}</td>
              <td>{purchase.nom}</td>
              <td>{purchase.prenom}</td>
              <td>{purchase.adresse}</td>
              <td>{purchase.num}</td>
              <td>{purchase.etat}</td>
              <td>
                <select
                  value={purchase.etat}
                  onChange={(e) =>
                    handleStateChange(purchase.id, e.target.value)
                  }
                >
                  <option value="commandé">Commandé</option>
                  <option value="confirmé">Confirmé</option>
                  <option value="envoyé">Envoyé</option>
                  <option value="livré">Livré</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesTable;