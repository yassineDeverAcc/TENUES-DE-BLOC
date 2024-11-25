import React from "react";
import logo from "../images/IMG_0684.PNG"; // Chemin vers votre fichier PNG
import panier from "../images/shopping-cart (1).png";
import defaulImage from "../images/shopping-cart (2).png";
import "./../styles/Header.css";

const Header = ({cart}) => {

  const isCartEmpty = cart.length === 0;
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Logo" className="header-logo" />
        <img src={isCartEmpty ? panier :  defaulImage} alt="logo" className="header-panier" />
      </div>
    </header>
  );
};

export default Header;