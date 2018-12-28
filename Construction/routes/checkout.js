const express = require("express");
const router = express.Router();
const user_md = require("../models/users");
const bill_md = require("../models/bills");
const dateformat = require("dateformat");
const book_md = require("../models/book");

router.get("/", (req, res) => {
  let data = {};
  if (!req.session.user) {
    data.user = false;
  } else {
    data.user = req.session.user;
    // let rs = user_md.getUserById(data.user.ma_tai_khoan);
  }

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }
  data.basket = req.session.basket;

  res.render("checkout", {
    data: data
  });
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    req.session.checkout = 1;
    res.redirect("/signin");
  } else {
    let data = {};
    let id_shippers = ["a1", "a2", "b1", "b2", "b3"];
    data.user = req.session.user;
    data.basket = req.session.basket;
    bill_md
      .getMaxBillId()
      .then(billID => {
        let ID_NOW = billID[0].ID_MAX + 1;
        let date = dateformat(new Date(), "yyyy-mm-dd");
        let bill = {
          ma_hoa_don_ban: ID_NOW,
          ma_tai_khoan: data.user.ma_tai_khoan,
          ngay_tao: date,
          trang_thai_don: "cho_duyet",
          id_shipper:
            id_shippers[Math.floor(Math.random() * id_shippers.length)]
        };

        bill_md.addBill(bill).then(result => {
          for (let i = 0; i < data.basket.length; i++) {
            const billDetail = {
              ma_hoa_don_ban: ID_NOW,
              ma_sach: data.basket[i].ma_sach,
              so_luong: data.basket[i].so_luong
            };

            bill_md
              .addBillDetail(billDetail)
              .then(result => {
                return book_md.getQuantumById(billDetail.ma_sach);
              })
              .then(results => {
                let quantum = results[0].so_luong;
                console.log(billDetail.ma_sach);
                return book_md.minusBooks(
                  billDetail.ma_sach,
                  quantum - billDetail.so_luong
                );
              })
              .then(result => {
                console.log("add bill success");
                req.session.basket = null;
                res.redirect("/");
              });
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

module.exports = router;
