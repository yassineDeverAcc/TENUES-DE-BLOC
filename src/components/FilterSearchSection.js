import React from "react";
import "./../styles/FilterSearch.css";

const FilterSearchSection = ({
  filterState,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="filter-search-section">
      <div className="dropdown">
        <label htmlFor="filter-state">Filtrer par état :</label>
        <select
          id="filter-state"
          value={filterState}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="tout">Tout</option>
          <option value="commandé">Commandé</option>
          <option value="confirmé">Confirmé</option>
          <option value="envoyé">Envoyé</option>
          <option value="livré">Livré</option>
        </select>
      </div>
      <div className="search-bar">
        <label htmlFor="search">Chercher :</label>
        <input
          id="search"
          type="text"
          placeholder="Rechercher par ID ou Nom"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterSearchSection;