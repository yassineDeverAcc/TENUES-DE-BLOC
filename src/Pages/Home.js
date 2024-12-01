import React, { useState } from "react";
import Header from "./../components/Header";
import HeroSection from "./../components/HeroSection";
import FeatureSection from "./../components/FeatureSection";
import Products from "./../components/Products";
import "./../styles/Home.css"

function Home() {
  const [cart, setCart] = useState([]); // Liste des produits dans le panier
  const [disabledItems, setDisabledItems] = useState([]); // Liste des items désactivés

  return (
    <div className="App">
      <div className="main-container">
        <Header cart={cart} />
        <HeroSection />
        <FeatureSection />
        {/* Passe les états et leurs setters comme props */}
        <Products cart={cart} setCart={setCart} disabledItems={disabledItems} setDisabledItems={setDisabledItems} />
      </div>
    </div>
  );
}

export default Home;