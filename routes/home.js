const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {});
});

// default export
module.exports = router;
