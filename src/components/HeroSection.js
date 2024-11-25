import React from "react";
import heroImage from "../images/rb_43739.png"; // Chemin correct
import "./../styles/HeroSection.css";

const hstyle ={fontSize: '2rem'};

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Notre devise c'est la qualité</h1>
        <h1 className="hero-title" style={hstyle}>Be your own doc</h1>
        <p className="hero-text">
          Confort, qualité et style réunis pour vos journées au bloc.
        </p>
        <button className="hero-button">Découvrir</button>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Personne portant une tenue de bloc" />
      </div>
    </section>
  );
};

export default HeroSection;