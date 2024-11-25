import React from "react";
import "./PurchasesTable.css";

const PurchasesTable = ({ purchases, onStateChange }) => {
  return (
    <table className="purchases-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prix ($)</th>
          <th>Changer l'etat</th>
          <th>Etat Actuel</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((purchase) => (
          <tr key={purchase.id}>
            <td>{purchase.id}</td>
            <td>{purchase.name}</td>
            <td>{purchase.price}</td>
            <td>
              <select
                value={purchase.state}
                onChange={(e) =>
                  onStateChange(purchase.id, e.target.value)
                }
              >
                <option value="commandé">Commandé</option>
                <option value="confirmé">Confirmé</option>
                <option value="envoyé">Envoyé</option>
                <option value="deliveré">Deliveré</option>
              </select>
            </td>
            <td>{purchase.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PurchasesTable;
