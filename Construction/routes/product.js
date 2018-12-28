const express = require("express");
const router = express.Router();

const categories_md = require("../models/categories");
const book_md = require("../models/book");

// display product information with product id
router.get("/:id", (req, res) => {
    let data = {};
    let id = req.params.id;

    if (!req.session.basket) {
        req.session.basket = [];
        data.basket = req.session.basket;
    }

    data.basket = req.session.basket;

    categories_md
        .getAllCategories()
        .then(categories => {
            data.categories = categories;
            return book_md.getBookById(id);
        })
        .then(products => {
            data.product = products[0];
            res.render("productdetail", {
                data: data
            });
        })
        .catch(err => console.log(err + ""));
});

// add product to basket
router.post("/", (req, res) => {
    if (!req.session.basket) {
        req.session.basket = [];
    }

    let params = req.body;
    req.session.basket.push(params);
    console.log(req.session.basket);

    res.redirect("/checkout");
});

module.exports = router;