const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/home");
const menuRouter = require("./routes/menu");
const contactRouter = require("./routes/contact");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/menu", menuRouter);
app.use("/contact", contactRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
