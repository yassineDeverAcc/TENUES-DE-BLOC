import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import logo from "../images/IMG_0684.PNG";
import panierr from "../images/shopping-cart (1).png";
import defaulImage from "../images/shopping-cart (2).png";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

const Header = () => {
  const { cart } = useContext(CartContext); // Utilisation du contexte pour cart

  const isCartEmpty = cart.length === 0;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="header-logo" />
        </Link>
        <Link to="/panier">
          <img
            src={isCartEmpty ? panierr : defaulImage}
            alt="Panier"
            className="header-panier"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;