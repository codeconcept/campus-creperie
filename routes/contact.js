const express = require("express");
const router = express.Router();
const fs = require("fs");

const filename = `messages-${Date.now()}.txt`;
const writer = fs.createWriteStream(filename, { flags: "a" });

const coords = {
  address: "1 Avenue Alphonse Legault, 35170 Bruz",
  tel: "06-06-06-06-06",
  email: "contact@creperie.bzh"
};

let messages = [];
let previousMessagesLoaded = false;

router.get("/", (req, res) => {
  res.render("contact", { coords });
});

router.post("/", (req, res) => {
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

// default export
module.exports = router;
