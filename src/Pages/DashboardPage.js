import React, { useState } from "react";
import "./Dashboard.css";
import FilterSearchSection from "./FilterSearchSection";
import PurchasesTable from "./PurchasesTable";

const DashboardPage = () => {
  const [purchases, setPurchases] = useState([
    { id: 1, name: "John Doe", price: 100, state: "commandé" },
    { id: 2, name: "Jane Smith", price: 150, state: "confirmé" },
    { id: 3, name: "Alice Johnson", price: 200, state: "envoyé" },
    { id: 4, name: "Bob Brown", price: 50, state: "deliveré" },
  ]);

  const [filterState, setFilterState] = useState("tout");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (state) => setFilterState(state);
  const handleSearchChange = (query) => setSearchQuery(query);

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
    <div className="dashboard-page">
      <h1>Liste de Commandes</h1>
      <FilterSearchSection
        filterState={filterState}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <PurchasesTable
        purchases={filteredPurchases}
        onStateChange={handleStateChange}
      />
    </div>
  );
};

export default DashboardPage;
