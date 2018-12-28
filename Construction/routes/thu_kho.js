const express = require("express");
const router = express.Router();
const dateformat = require("dateformat");
const book_md = require("../models/book");
const bill_md = require("../models/bills");
const displayBill = require("../controllers/displayBill");

router.get("/", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let data = {};
    book_md
      .getAllBooks()
      .then(sach => {
        data.sach = sach;
        data.user = req.session.user;
        res.render("thu_kho/index", {
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

router.get("/sach/new", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let data = {};
    book_md
      .getAllCategory()
      .then(category => {
        data.user = req.session.user;
        data.category = category;
        res.render("thu_kho/new", {
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

router.post("/sach/new", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let sach = req.body;
    // console.log(sach);
    book_md
      .getMaxBookId()
      .then(result => {
        sach.ma_sach = result[0].ID_MAX + 1;
        book_md
          .addBook(sach)
          .then(resultAddBook => {
            res.redirect("/thukho");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

router.get("/sach/edit/:id", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let id = req.params.id;
    let data = {};
    book_md
      .getBookById(id)
      .then(books => {
        data.sach = books[0];
        book_md
          .getAllCategory()
          .then(category => {
            // console.log(data);
            data.category = category;
            data.user = req.session.user;
            res.render("thu_kho/edit", {
              data: data
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

router.put("/sach/edit", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let data = req.body;
    console.log(data);
    book_md
      .updateBook(data)
      .then(result => {
        res.json({ status_code: 200 });
      })
      .catch(err => {
        res.json({ status_code: 500 });
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

// xoa sach
router.delete("/sach/delete", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let ma_sach = req.body.ma_sach;

    book_md
      .deleteBook(ma_sach)
      .then(result => {
        res.json({
          status_code: 200
        });
      })
      .catch(err => {
        res.json({
          status_code: 500
        });
      });
  } else {
    res.redirect("/signin");
  }
});

router.get("/bills/delivery", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let data = {};

    bill_md
      .getAllBillByStatus("da_duyet")
      .then(bills => {
        for (let i = 0; i < bills.length; i++) {
          bills[i].ngay_tao = dateformat(bills[i].ngay_tao, "dd-mm-yyyy");
        }
        data.user = req.session.user;
        data.bills = displayBill.billIsDisplayed(bills);
        // console.log(data);
        res.render("thu_kho/delivery", {
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

router.get("/bills/delivery/:id", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "thu_kho") {
    let id = req.params.id;
    bill_md
      .updateNewStatusForBill(id, "dang_giao")
      .then(result => {
        res.redirect("/thukho/bills/delivery");
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;
