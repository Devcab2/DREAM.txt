// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const userLogin = require("./routes/login");
const favPage = require("./routes/favPage");
const book = require("./routes/books");
const conversations = require("./routes/conversations");
const userLogout = require("./routes/userLogout");
const addBook = require("./routes/addBook");
const filterGenre = require("../BUY-SELL/routes/filterGenre");
const filterPrice = require("../BUY-SELL/routes/filterPrice");
const bookDelete = require("./routes/deleteBook");
const favDelete = require("./routes/favDelete");
const purchaseMessage = require("./routes/purchaseMessage");
const singleBook = require("./routes/singleBook");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/login", userLogin(db));
app.use("/api/conversations", conversations(db));
app.use("/api/logout", userLogout(db));
app.use("/api/favourites", favPage(db));
app.use("/api/books", book(db));
app.use("/api/addBook", addBook(db));
app.use("/api/books/genre", filterGenre(db));
app.use("/api/books/price", filterPrice(db));
app.use("/api/deleteBook", bookDelete(db));
app.use("/api/favDelete", favDelete(db));
app.use("/api/purchaseMessage", purchaseMessage());
app.use("/api/books/book", singleBook(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("home", { userId: req.cookies.userId });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
