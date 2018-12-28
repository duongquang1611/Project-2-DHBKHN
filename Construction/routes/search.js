const express = require("express");
const router = express.Router();

const categories_md = require("../models/categories");
const search_ctrl = require("../controllers/search");

router.post("/", (req, res) => {
    let data = {};
    let key = req.body.search.trim();

    if (!req.session.basket) {
        req.session.basket = [];
        data.basket = req.session.basket;
    }

    data.basket = req.session.basket;

    data.products = [];

    search_ctrl.searchFullText(key, data);



    // if (data.products.length == 0) {
    //     console.log(data.products.length);
    //     search_ctrl.searchEachWord(key, data);
    // }

    categories_md
        .getAllCategories()
        .then(categories => {
            data.categories = categories;
            res.render("search", {
                data: data
            });
        }).catch(err => console.log(err + ""));
});

module.exports = router;