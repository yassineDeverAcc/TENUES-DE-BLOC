import React from "react";
import "./../css/Form.css" ;

function FormSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Form submitted!");
  };

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" required />
      <input type="text" placeholder="Prenom" required />
      <input type="text" placeholder="Adresse" required />
      <input type="tel" placeholder="Numéro de Télephone" required />
      <button type="submit">Confirmer la Commande</button>
    </form>
  );
}

export default FormSection;
