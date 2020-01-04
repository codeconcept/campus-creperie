const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const dishes = [
  { id: 1, title: "Galette complète", price: 4.5 },
  { id: 2, title: "Crêpe beurre sucre", price: 1.5 }
];

const coords = {
  address: "1 Avenue Alphonse Legault, 35170 Bruz",
  tel: "06-06-06-06-06",
  email: "contact@creperie.bzh"
};

let messages = [];

app.get("/", (req, res) => {
  res.render("home", {});
});

app.get("/menu", (req, res) => {
  res.render("menu", { dishes });
});

app.get("/contact", (req, res) => {
  res.render("contact", { coords });
});

app.post("/contact", (req, res) => {
  console.log("req.body", req.body);
  const message = req.body;
  messages = [...messages, message];
  console.log("messages", messages);
  res.render("contact", { coords });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
