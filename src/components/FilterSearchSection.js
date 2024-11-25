import React from "react";
import "./FilterSearch.css";

const FilterSearchSection = ({
  filterState,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="filter-search-section">
      <div className="dropdown">
        <label htmlFor="filter-state">Filter par état:</label>
        <select
          id="filter-state"
          value={filterState}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="tout">tout</option>
          <option value="commandé">Commandé</option>
          <option value="confirmé">Confirmé</option>
          <option value="envoyé">Envoyé</option>
          <option value="deliveré">Deliveré</option>
        </select>
      </div>
      <div className="search-bar">
        <label htmlFor="search">Chercher:</label>
        <input
          id="search"
          type="text"
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterSearchSection;
