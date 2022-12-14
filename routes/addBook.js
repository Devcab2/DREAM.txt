const express = require("express");
const { addNewBooks, getUserWithId } = require("../db/server/database");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.cookies.userId;
    getUserWithId(3)
      .then((user) => {
        if (user.user_type === "admin") {
          const temVars = { user: user, newBook: null, userId };
          console.log(user);
          res.render("addBook", temVars);
        }
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/home");
      });
  });

  // userId is not from cookie yet, still hardcode
  router.post("/", (req, res) => {
    const userId = req.cookies.userId;
    const books = req.body;
    console.log("hello", books, userId);
    getUserWithId(userId)
      .then((user) => {
        addNewBooks(Number(userId), books)
          .then((newBook) => {
            const temVars = { user: user, newBook: newBook, userId };
            console.log("temVars", temVars);
            res.render("addBook", temVars);
          })
          .catch((e) => {
            console.log(e);
            res.redirect("/");
          });
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/");
      });
  });
  return router;
};
