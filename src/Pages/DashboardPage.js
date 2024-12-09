import React, { useState } from "react";
import "./../styles/Dashboard.css";
import PurchasesTable from "./../components/PurchasesTable";

const DashboardPage = () => {
  const [purchases, setPurchases] = useState([
    { id: 1, name: "John Doe", price: 100, state: "commandé" },
    { id: 2, name: "Jane Smith", price: 150, state: "confirmé" },
    { id: 3, name: "Alice Johnson", price: 200, state: "envoyé" },
    { id: 4, name: "Bob Brown", price: 50, state: "deliveré" },
  ]);

  const [filterState] = useState("tout");
  const [searchQuery] = useState("");

  

  const handleStateChange = (id, newState) => {
    setPurchases((prevPurchases) =>
      prevPurchases.map((purchase) =>
        purchase.id === id ? { ...purchase, state: newState } : purchase
      )
    );
  };

  // Filtered and searched data
  const filteredPurchases = purchases.filter((purchase) => {
    const matchesState =
      filterState === "tout" || purchase.state === filterState;
    const matchesSearch =
      purchase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(purchase.id).includes(searchQuery);
    return matchesState && matchesSearch;
  });

  return (
    <body>
    <div className="dashboard-page">
      <h1>Liste de Commandes</h1>
      <PurchasesTable
        purchases={filteredPurchases}
        onStateChange={handleStateChange}
      />
    </div>
    </body>
  );
};

export default DashboardPage;
