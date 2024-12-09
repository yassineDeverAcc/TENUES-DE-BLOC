import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PanierPage from "./Pages/PanierPage";
import Commandes from './Pages/DashboardPage'
import { CartProvider } from "./components/CartContext";


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/panier" element={<PanierPage />} />
              <Route path="/commandes" element={<Commandes />} />

            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;