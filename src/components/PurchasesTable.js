import React, { useState, useEffect } from "react";
import "./../styles/PurchasesTable.css";
import FilterSearchSection from "./FilterSearchSection"; // Assurez-vous que ce chemin est correct



const PurchasesTable = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filterState, setFilterState] = useState("tout"); // État du filtre

  const [searchQuery, setSearchQuery] = useState(""); // Query pour la recherche
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    model: "",
    prix: "",
    taille: "",
  });

  // Fonction pour récupérer les données de la table commande
  useEffect(() => {
    const fetchPurchases = async () => {
      const response = await fetch("http://localhost:5001/api/data");
      const data = await response.json();
      setPurchases(data);
      setFilteredPurchases(data); // Initialiser les données filtrées
    };
    fetchPurchases();
    const interval = setInterval(fetchPurchases, 5000); // Actualise toutes les 5 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle lorsqu'on quitte le composant
  }, []);

  // Ajouter la logique de filtrage ici (recherche par ID ou Nom)
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

  // Fonction pour gérer le changement d'état dans le tableau principal
  const handleStateChange = async (id, newState) => {
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

  // Fonction pour gérer le changement de détails dans le popup
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...selectedOrderDetails.details];
    updatedDetails[index][field] = value;
    setSelectedOrderDetails({ ...selectedOrderDetails, details: updatedDetails });
  };

  // Afficher les détails dans le popup
  const handleRowClick = async (orderId) => {
    const response = await fetch(`http://localhost:5001/api/order-details/${orderId}`);
    const data = await response.json();
    setSelectedOrderDetails(data);
    setPopupVisible(true);
  };

  // Ajouter un nouvel article
  const handleAddItem = () => {
    if (!newItem.model || !newItem.prix || !newItem.taille) {
      alert("Veuillez remplir tous les champs pour ajouter un article.");
      return;
    }

    const updatedDetails = [
      ...selectedOrderDetails.details,
      { ...newItem, idd: Date.now() }, // ID temporaire basé sur l'heure actuelle
    ];

    setSelectedOrderDetails({
      ...selectedOrderDetails,
      details: updatedDetails,
    });

    // Réinitialiser les champs du formulaire
    setNewItem({ model: "", prix: "", taille: "" });
  };

  // Modifier l'état de la commande dans le popup
  const handleStateChangeInPopup = (e) => {
    const newState = e.target.value;
    setSelectedOrderDetails({
      ...selectedOrderDetails,
      commande: {
        ...selectedOrderDetails.commande,
        etat: newState, // Mise à jour de l'état dans l'objet commande
      },
    });
  };

  // Enregistrer les modifications des détails
  const handleSaveDetails = async () => {
    await fetch(`http://localhost:5001/api/update-details`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedOrderDetails.details),
    });
    alert("Détails enregistrés !");
    // Mettre à jour la table après l'enregistrement
    const updatedPurchases = await fetch("http://localhost:5001/api/data").then((res) => res.json());
    setPurchases(updatedPurchases); // Rafraîchir les données
    setPopupVisible(false); // Fermer le popup après l'action
  };

  // Modifier la commande principale
  const handleUpdateOrder = async () => {
    await fetch(`http://localhost:5001/api/update-order/${selectedOrderDetails.commande.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedOrderDetails.commande),
    });
    alert("Commande mise à jour !");
    // Mettre à jour la table après la mise à jour
    const updatedPurchases = await fetch("http://localhost:5001/api/data").then((res) => res.json());
    setPurchases(updatedPurchases); // Rafraîchir les données
    setPopupVisible(false); // Fermer le popup après l'action
  };

  // Supprimer une ligne dans details_commande
  const handleDeleteDetail = async (idd) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if (confirmed) {
      await fetch(`http://localhost:5001/api/delete-detail/${idd}`, { method: "DELETE" });
      setSelectedOrderDetails({
        ...selectedOrderDetails,
        details: selectedOrderDetails.details.filter((item) => item.idd !== idd),
      });
    }
  };

  // Supprimer toute la commande
  const handleDeleteOrder = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?");
    if (confirmed) {
      await fetch(`http://localhost:5001/api/delete-order/${selectedOrderDetails.commande.id}`, {
        method: "DELETE",
      });
      alert("Commande supprimée !");
      setPopupVisible(false);
      // Mettre à jour la table après la suppression
      const updatedPurchases = await fetch("http://localhost:5001/api/data").then((res) => res.json());
      setPurchases(updatedPurchases); // Rafraîchir les données
    }
  };

  return (
    <div>
      {/* Ajouter la barre de recherche */}
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
            <th>Nom</th>
            <th>Prénom</th>
            <th>État</th>
            <th>Changer l'état</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((purchase) => (
            <tr
              key={purchase.id}
              onClick={() => handleRowClick(purchase.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{purchase.id}</td>
              <td>{purchase.wilaya}</td>
              <td>{purchase.nom}</td>
              <td>{purchase.prenom}</td>
              <td>{purchase.etat}</td>
              <td>
                <select
                  value={purchase.etat}
                  onChange={(e) => handleStateChange(purchase.id, e.target.value)}
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

      {popupVisible && selectedOrderDetails && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Détails de la commande</h2>
            <table>
              <tbody>
                {Object.entries(selectedOrderDetails.commande).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      <input
                        value={value}
                        onChange={(e) =>
                          setSelectedOrderDetails({
                            ...selectedOrderDetails,
                            commande: {
                              ...selectedOrderDetails.commande,
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>État</td>
                  <td>
                    <select
                      value={selectedOrderDetails.commande.etat}
                      onChange={handleStateChangeInPopup}
                    >
                      <option value="commandé">Commandé</option>
                      <option value="confirmé">Confirmé</option>
                      <option value="envoyé">Envoyé</option>
                      <option value="livré">Livré</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Tracking</td>
                  <td>
                    <input
                      value={selectedOrderDetails.commande.tracking || ""}
                      onChange={(e) =>
                        setSelectedOrderDetails({
                          ...selectedOrderDetails,
                          commande: {
                            ...selectedOrderDetails.commande,
                            tracking: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Détails des articles</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Modèle</th>
                  <th>Prix</th>
                  <th>Taille</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderDetails.details.map((item, index) => (
                  <tr key={item.idd}>
                    <td>{item.idd}</td>
                    <td>
                      <input
                        value={item.model}
                        onChange={(e) =>
                          handleDetailChange(index, "model", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={item.prix}
                        onChange={(e) =>
                          handleDetailChange(index, "prix", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={item.taille}
                        onChange={(e) =>
                          handleDetailChange(index, "taille", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteDetail(item.idd)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Total : {selectedOrderDetails.total} DZD</h3>
            <button onClick={handleUpdateOrder}>Changer</button>
            <button onClick={handleDeleteOrder} style={{ backgroundColor: "red" }}>
              Supprimer Commande
            </button>
            <button onClick={() => setPopupVisible(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasesTable;