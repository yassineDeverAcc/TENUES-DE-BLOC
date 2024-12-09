const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Adresse du frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Autorisez les headers nécessaires
  }));
app.use(express.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "doc",
  charset: "utf8mb4_general_ci", // Meilleure prise en charge des caractères
});

// Connecter à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL !");
});

// Route pour récupérer les données de la table `commande`
app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM commande"; // Requête SQL pour récupérer toutes les commandes
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête :", err);
      res.status(500).json({ error: "Erreur serveur" });
      return;
    }
    res.json(results); // Retourne les résultats sous forme de JSON
  });
});

// Route pour mettre à jour l'état d'une commande
app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { etat } = req.body;
  
    console.log(`ID reçu : ${id}, Etat reçu : ${etat}`); // Vérifier les données entrantes
  
    if (!etat || !id) {
      return res.status(400).json({ success: false, error: "ID ou Etat manquant" });
    }
  
    const query = "UPDATE commande SET etat = ? WHERE id = ?";
  
    db.query(query, [etat, id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de l'état :", err);
        return res.status(500).json({ success: false, error: "Erreur serveur" });
      }
      if (result.affectedRows === 0) {
        console.log(`Aucune commande trouvée avec l'ID ${id}`);
        return res.status(404).json({ success: false, error: "Commande non trouvée" });
      }
      console.log(`État mis à jour avec succès pour la commande ID ${id}`);
      res.json({ success: true });
    });
  });
// Lancer le serveur
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serveur Node.js démarré sur le port ${PORT}`);
});