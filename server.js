const express = require("express");
const app = express();
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");
const filename = `messages-${Date.now()}.txt`;
const writer = fs.createWriteStream(filename, { flags: "a" });

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.set("layout", "layouts/layout");
app.use(expressLayouts);

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
let previousMessagesLoaded = false;

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
  const message = { message: req.body, date: new Date().toISOString() };
  if (!previousMessagesLoaded) {
    readMessages();
  }
  messages = [...messages, message];
  console.log("messages", messages);
  writer.write(JSON.stringify(messages), err => {
    if (err) {
      return res.status(500).send({ msg: "Error saving data " });
    }
  });
  res.render("contact", { coords });
});

function readMessages() {
  console.log("Loading previous messages");
  const reader = fs.createReadStream(filename);
  let fileContent = "";
  reader.on("data", chunk => {
    fileContent += chunk.toString();
  });

  reader.on("end", () => {
    messages = JSON.parse(fileContent);
    previousMessagesLoaded = true;
  });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
