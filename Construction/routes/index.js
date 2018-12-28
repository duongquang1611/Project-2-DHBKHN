const express = require("express");
const router = express.Router();
const categories_md = require("../models/categories");
const book_md = require("../models/book");
const user_md = require("../models/users");
var dateformat = require("dateformat");
/* GET home page. */
router.get("/", (req, res, next) => {
  let data = {};
  if (!req.session.user) {
    data.user = false;
  } else {
    data.user = req.session.user;
  }

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }

  data.basket = req.session.basket;

  book_md.getTotalBook().then(totals => {
    data.totalBook = totals[0].totalBook;
  });

  user_md.getTotalUser().then(totals => {
    data.totalUser = totals[0].totalUser;
  });

  book_md
    .getAllBooks()
    .then(products => {
      data.products = products;
      res.render("index", {
        data: data
      });
    })
    .catch(err => console.log(err + ""));
});

// signin
router.get("/signin", (req, res) => {
  res.render("signin", {
    data: {}
  });
});

router.post("/signin", (req, res) => {
  let dataSignIn = req.body;
  let data = {};

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }

  user_md
    .getUserByUsername(dataSignIn.tai_khoan)
    .then(users => {
      let user = users[0];
      user.ngay_sinh = dateformat(user.ngay_sinh, "yyyy-mm-dd");
      let checkPassword = dataSignIn.mat_khau.toString() == user.mat_khau;

      if (!checkPassword) {
        res.render("signin", {
          data: {
            error: "Sai tài khoản hoặc mật khẩu"
          }
        });
      } else {
        // save session
        req.session.user = user;

        if (user.quyen_su_dung == "user") {
          // người dùng
          if (req.session.checkout == 1) {
            res.redirect("/checkout");
          } else {
            res.redirect("/");
          }
        } else if (user.quyen_su_dung == "admin") {
          // admin
          res.redirect("/admin");
        } else if (user.quyen_su_dung == "thu_kho") {
          // thủ kho
          res.redirect("/thukho");
        } else {
          // kế toán
          res.redirect("/ketoan");
        }
      }
    })
    .catch(err => {
      res.render("signin", {
        data: {
          error: "Sai tài khoản hoặc mật khẩu"
        }
      });
    });
});

// signup
router.get("/signup", (req, res) => {
  res.render("signup", {
    data: {}
  });
});

router.post("/signup", (req, res) => {
  let data = req.body;
  user_md.getMaxUserId().then(users => {
    data.ma_tai_khoan = users[0].ID_MAX + 1;

    //new account
    let account = {
      ma_tai_khoan: data.ma_tai_khoan,
      tai_khoan: data.tai_khoan,
      mat_khau: data.mat_khau,
      quyen_su_dung: "user"
    };

    // new user
    let user = {
      ma_tai_khoan: data.ma_tai_khoan,
      ho_ten: data.ho_ten,
      dia_chi: data.dia_chi,
      sdt: data.sdt,
      ngay_sinh: data.ngay_sinh,
      gioi_tinh: data.gioi_tinh,
      email: data.email
    };

    user_md
      .addAccount(account)
      .then(result1 => {
        user_md
          .addUser(user)
          .then(result2 => {
            console.log("Thêm người dùng thành công");
            res.redirect("/signin");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
});

router.get("/aboutus", (req, res) => {
  let data = {};

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }

  data.basket = req.session.basket;

  if (!req.session.user) {
    data.user = false;
  } else {
    data.user = req.session.user;
  }
  res.render("aboutus", {
    data: data
  });
});

router.get("/404error", (req, res) => {
  let data = {};

  if (!req.session.basket) {
    req.session.basket = [];
    data.basket = req.session.basket;
  }

  data.basket = req.session.basket;

  if (!req.session.user) {
    data.user = false;
  } else {
    data.user = req.session.user;
  }
  res.render("404error", {
    data: data
  });
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;