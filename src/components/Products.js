import React from "react";
import "./../styles/Products.css";
import blousebleu from "../images/medicine-uniform-healthcare-medical-workers-day-space-text.jpg";

const feats = [
  {
    id: 1,
    title: "Fièrement 100% Algérien",
    description: "Nos tenues de bloc sont conçues et fabriquées en Algérie",
    image: blousebleu,
  },
  {
    id: 2,
    title: "Confort Absolu, Toute la Journée",
    description: "Nous comprenons l’importance du confort dans votre métier.",
    image: blousebleu,
  },
  {
    id: 3,
    title: "Hygiène et Sécurité Optimales",
    description: "Parce que votre sécurité et celle de vos patients sont primordiales",
    image: blousebleu,
  },
  {
    id: 4,
    title: "Style Professionnel Élégant",
    description: "Qui a dit que les tenues de bloc ne pouvaient pas être stylées",
    image: blousebleu,
  },
  {
    id: 5,
    title: "Durabilité Qui Fait la Différence",
    description: "Nos tenues de bloc sont conçues pour durer.",
    image: blousebleu,
  },
];

const Products = ({ cart, setCart, disabledItems, setDisabledItems }) => {
  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (id) => {
    if (!cart.includes(id)) {
      const newCart = [...cart, id];
      const newDisabledItems = [...disabledItems, id];
      
      setCart([...cart, id]); // Ajoute le produit au panier
      setDisabledItems([...disabledItems, id]); // Désactive le bouton en grisant

      console.log("cart: ", newCart);
      console.log("Disabled Items: ", newDisabledItems); 
    }
  };

  return (
    <section className="sec">
      <div className="prodTitle">
        <h1>Nos produits</h1>
      </div>

      <div className="product-grid-container">
        {feats.map((feat) => (
          <div key={feat.id} className={`product-feature-box box-${feat.id}`}>
            <div className="product-feature-image">
              <img src={feat.image} alt={feat.title} />
            </div>
            <div className="product-feature-text">
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
              <button
                className={`add-to-cart-btn ${disabledItems.includes(feat.id) ? 'disabled' : ''}`}
                onClick={() => handleAddToCart(feat.id)}
                disabled={disabledItems.includes(feat.id)} // Désactive le bouton si déjà ajouté
              >
                {disabledItems.includes(feat.id) ? 'Ajouté au panier' : 'Ajouter au panier'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;