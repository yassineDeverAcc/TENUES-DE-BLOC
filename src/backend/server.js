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

  app.get("/api/order-details/:id", (req, res) => {
    const { id } = req.params;
  
    const queryCommande = "SELECT * FROM commande WHERE id = ?";
    const queryDetails = "SELECT * FROM details_commande WHERE id_commande = ?";
  
    db.query(queryCommande, [id], (err, commandeResults) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
  
      db.query(queryDetails, [id], (err, detailsResults) => {
        const total = detailsResults.reduce((acc, item) => acc + item.prix, 0) + commandeResults[0].frais;
        res.json({ commande: commandeResults[0], details: detailsResults, total });
      });
    });
  });
  app.put("/api/update-details", (req, res) => {
    const updates = req.body;
  
    updates.forEach((item) => {
      db.query(
        "UPDATE details_commande SET model = ?, prix = ?, taille = ? WHERE idd = ?",
        [item.model, item.prix, item.taille, item.idd],
        (err) => {
          if (err) console.error("Erreur de mise à jour :", err);
        }
      );
    });
    res.json({ success: true });
  });

  app.delete("/api/delete-detail/:idd", (req, res) => {
    const { idd } = req.params;
  
    db.query("DELETE FROM details_commande WHERE idd = ?", [idd], (err) => {
      if (err) return res.status(500).json({ error: "Erreur de suppression" });
      res.json({ success: true });
    });
  });
  app.put("/api/update-order/:id", (req, res) => {
    const { id } = req.params;
    const { wilaya, commune, type_livraison, frais, nom, prenom, adresse, num, etat, tracking } = req.body;
  
    const query = `
      UPDATE commande 
      SET 
        wilaya = ?, 
        commune = ?, 
        type_livraison = ?, 
        frais = ?, 
        nom = ?, 
        prenom = ?, 
        adresse = ?, 
        num = ?, 
        etat = ?,
        tracking = ? 
      WHERE id = ?
    `;
  
    db.query(query, [wilaya, commune, type_livraison, frais, nom, prenom, adresse, num, etat, tracking, id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la commande :", err);
        return res.status(500).json({ success: false, error: "Erreur serveur" });
      }
      res.json({ success: true });
    });
  });
  app.delete("/api/delete-order/:id", (req, res) => {
    const { id } = req.params;
  
    // Suppression des détails liés à la commande
    const deleteDetailsQuery = "DELETE FROM details_commande WHERE id_commande = ?";
    const deleteOrderQuery = "DELETE FROM commande WHERE id = ?";
  
    db.query(deleteDetailsQuery, [id], (err) => {
      if (err) {
        console.error("Erreur lors de la suppression des détails :", err);
        return res.status(500).json({ success: false, error: "Erreur serveur" });
      }
      db.query(deleteOrderQuery, [id], (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de la commande :", err);
          return res.status(500).json({ success: false, error: "Erreur serveur" });
        }
        res.json({ success: true });
      });
    });
  });
  app.put("/api/update-order/:id", (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
  
    const query = "UPDATE commande SET ? WHERE id = ?";
    db.query(query, [updatedFields, id], (err) => {
      if (err) return res.status(500).json({ error: "Erreur mise à jour" });
      res.json({ success: true });
    });
  });

  app.delete("/api/delete-order/:id", (req, res) => {
    const { id } = req.params;
  
    // Supprimer les détails de la commande
    db.query("DELETE FROM details_commande WHERE id_commande = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: "Erreur suppression détails" });
  
      // Ensuite, supprimer la commande principale
      db.query("DELETE FROM commande WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: "Erreur suppression commande" });
        res.json({ success: true });
      });
    });
  });

  // Ajouter un article à la commande
// Route pour ajouter un article dans la table details_commande
app.post("/api/add-article", (req, res) => {
    const { orderId, model, prix, taille } = req.body;
  
    if (!orderId || !model || !prix || !taille) {
      return res.status(400).json({ success: false, error: "Tous les champs sont nécessaires" });
    }
  
    const query = "INSERT INTO details_commande (id_commande, model, prix, taille) VALUES (?, ?, ?, ?)";
  
    db.query(query, [orderId, model, prix, taille], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'ajout de l'article :", err);
        return res.status(500).json({ success: false, error: "Erreur serveur" });
      }
      res.json({ success: true, message: "Article ajouté avec succès" });
    });
  });
// Lancer le serveur
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serveur Node.js démarré sur le port ${PORT}`);
});