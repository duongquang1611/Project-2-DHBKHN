const express = require("express");
const router = express.Router();

const importRandom = require("../models/importRandom");

router.get("/sach", (req, res) => {
    importRandom.addRandomSach();
    res.json("add random sach success");
});

router.get("/user", (req, res) => {
    importRandom.addRandomUser();
    res.json("add random user success");
});

module.exports = router;