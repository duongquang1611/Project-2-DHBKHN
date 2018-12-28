const express = require("express");
const router = express.Router();
const bill_md = require("../models/bills");
const user_md = require("../models/users");
const dateformat = require("dateformat");

router.get("/bill/:id", (req, res) => {
  let id = req.params.id;

  let data = {};

  if (!req.session.user) {
    data.user = false;
    res.redirect("/signin");
  } else {
    data.user = req.session.user;
    // let rs = user_md.getUserById(data.user.ma_tai_khoan);
  }

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }
  data.basket = req.session.basket;

  bill_md
    .getBillsById(id)
    .then(bills => {
      data.bills = bills;
      // console.log(data);
      // for (let i = 0; i < data.bills.length; i++) {
      //     bill_md
      //         .getDetailBillsByBillId(data.bills[i].ma_hoa_don_ban)
      //         .then(billDetails => {
      //             let billDetail = billDetails[0];
      //             data.bills[i].billDetail = billDetail;
      //         })

      // }

      console.log(data);
      res.render("myBill", {
        data: data
      });
    })
    .catch(err => {
      console.log(err + "");
    });
});

router.get("/info/:id", (req, res) => {
  let id = req.params.id;
  let data = {};

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }

  data.basket = req.session.basket;

  if (!req.session.user) {
    data.user = false;
    res.redirect("/signin");
  } else {
    user_md.getUserById(id).then(users => {
      let user = users[0];
      user.ngay_sinh = dateformat(user.ngay_sinh, "yyyy-mm-dd");
      data.user = user;
      res.render("userInfo", {
        data: data
      });
    });
  }
});

router.put("/info", (req, res) => {
  let params = req.body;
  console.log(params);

  user_md
    .updateUser(params)
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
});

module.exports = router;
