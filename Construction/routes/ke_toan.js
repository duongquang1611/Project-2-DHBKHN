var express = require("express");
var router = express.Router();
var bill_md = require("../models/bills");
var book_md = require("../models/book");
var dateformat = require("dateformat");
var displayBill = require("../controllers/displayBill");

router.get("/", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "ke_toan") {
    let data = {};
    data.user = req.session.user;

    bill_md
      .getAllBillByStatus("dang_giao")
      .then(bills => {
        for (let i = 0; i < bills.length; i++) {
          bills[i].ngay_tao = dateformat(bills[i].ngay_tao, "dd-mm-yyyy");
        }

        data.bills = displayBill.billIsDisplayed(bills);
        data.user = req.session.user;
        res.render("ke_toan/index", {
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

router.get("/thanhtoan/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  bill_md
    .updateNewStatusForBill(id, "da_thanh_toan")
    .then(result => {
      res.redirect("/ketoan");
    })
    .catch(err => {
      console.log(err);
    });
});

// xoa bill, cong vào kho hàng
// xoa bill
router.get("/bills/canceled/:id", (req, res) => {
  let id = req.params.id;
  let addBook = [];
  // lay bill detail by id
  bill_md
    .getDetailBillsByBillId(id)
    .then(results => {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        // so luong sach con trong kho theo ma sach
        book_md.getQuantumById(results[i].ma_sach).then(result2 => {
          // let totalBook = result2[0].so_luong;
          // console.log(totalBook);
          book_md
            .minusBooks(
              results[i].ma_sach,
              result2[0].so_luong + results[i].so_luong
            )
            .then(result => {
              console.log(results[i].ma_sach + "," + results[i].so_luong);
            });
        });
      }

      bill_md
        .updateNewStatusForBill(id, "da_huy")
        .then(result => {
          res.redirect("/ketoan");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
