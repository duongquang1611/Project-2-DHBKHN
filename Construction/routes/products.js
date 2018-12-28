const express = require("express");
const router = express.Router();

const categories_md = require("../models/categories");
const book_md = require("../models/book");

router.get("/", (req, res) => {
    let data = {};

    if (!req.session.basket) {
        req.session.basket = [];
        data.basket = req.session.basket;
    }

    data.basket = req.session.basket;

    categories_md
        .getAllCategories()
        .then(categories => {
            data.categories = categories;
            return book_md.getAllBooks();
        })
        .then(products => {
            data.products = products;
            res.render("products", {
                data: data
            });
        })
        .catch(err => console.log(err + ""));
});

// the loai
router.get("/:id", (req, res) => {
    let data = {};
    let category = req.params.id;

    if (!req.session.basket) {
        req.session.basket = [];
        data.basket = req.session.basket;
    }

    data.basket = req.session.basket;

    book_md
        .getBookByCategory(category)
        .then(products => {
            data.products = products;
            return categories_md.getAllCategories();
        })
        .then(categories => {
            data.categories = categories;
            res.render("products", {
                data: data
            });
        })
        .catch(err => console.log(err + ""));
});

module.exports = router;