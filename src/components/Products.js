import React, { useContext } from "react";
import "./../styles/Products.css";
import blousebleu from "../images/medicine-uniform-healthcare-medical-workers-day-space-text.jpg";
import { CartContext } from "./CartContext";

const feats = [
  {
    id: "rouge",
    title: "Fièrement 100% Algérien",
    description: "Nos tenues de bloc sont conçues et fabriquées en Algérie",
    image: blousebleu,
  },
  {
    id: "bleu",
    title: "Confort Absolu, Toute la Journée",
    description: "Nous comprenons l’importance du confort dans votre métier.",
    image: blousebleu,
  },
  {
    id: "noir",
    title: "Hygiène et Sécurité Optimales",
    description: "Parce que votre sécurité et celle de vos patients sont primordiales",
    image: blousebleu,
  },
  {
    id: "noir",
    title: "Style Professionnel Élégant",
    description: "Qui a dit que les tenues de bloc ne pouvaient pas être stylées",
    image: blousebleu,
  },
  {
    id: "blanc",
    title: "Durabilité Qui Fait la Différence",
    description: "Nos tenues de bloc sont conçues pour durer.",
    image: blousebleu,
  },
];

const Products = () => {
  const { cart, setCart } = useContext(CartContext);

  // Ajouter un produit au panier
  const handleAddToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  // Supprimer un produit du panier
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((productId) => productId !== id));
  };

  // Réinitialiser le panier
  const handleResetCart = () => {
    setCart([]); // Réinitialise le cart
  };

  return (
    <section className="sec">
      <div className="prodTitle">
        <h1>Nos produits</h1>
        <button className="reset-cart-btn" onClick={handleResetCart}>
          Réinitialiser le panier
        </button>
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
                className={`add-to-cart-btn ${cart.includes(feat.id) ? 'disabled' : ''}`}
                onClick={() => handleAddToCart(feat.id)}
                disabled={cart.includes(feat.id)} // Désactivé si déjà dans le panier
              >
                {cart.includes(feat.id) ? "Ajouté au panier" : "Ajouter au panier"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;