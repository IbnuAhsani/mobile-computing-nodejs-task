const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const express = require("express");
const http = require("http");
const path = require("path");
const routes = require("./routes");

const PORT = 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "/public")));

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "default",
    layoutsDir: "views/layouts/",
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

app.set("port", process.env.PORT || PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(routes);

http.createServer(app).listen(app.get("port"), () => {
  console.log("server running at localhost:" + PORT);
});
