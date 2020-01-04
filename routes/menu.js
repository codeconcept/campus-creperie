const express = require("express");
const router = express.Router();

const dishes = [
  { id: 1, title: "Galette complète", price: 4.5 },
  { id: 2, title: "Crêpe beurre sucre", price: 1.5 }
];

router.get("/", (req, res) => {
  res.render("menu", { dishes });
});

// default export
module.exports = router;
