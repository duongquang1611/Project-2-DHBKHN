const book_md = require("../models/book");

const searchFullText = (key, data) => {
    book_md
        .getBooksByCategoryName(key)
        .then(products => {
            data.products.push(...products);
            return book_md.getBooksByName(key);
        })
        .then(products => {
            data.products.push(...products);
            return book_md.getBooksByAuthor(key);
        })
        .then(products => {
            data.products.push(...products);
            return book_md.getBooksByCompany(key);
        })
        .then(products => {
            data.products.push(...products);
            console.log(data);
        })
        .catch(err => console.log(err + ""));
}

const searchEachWord = (key, data) => {
    let keys = key.split(" ", 3);
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        searchFullText(keys[i], data);
    }
}

module.exports = {
    searchFullText: searchFullText,
    searchEachWord: searchEachWord
}