const express = require("express");
const router = express.Router();
const importRandom = require("../models/importRandom");
const book_md = require("../models/book");
const user_md = require("../models/users");
const bill_md = require("../models/bills");
const dateformat = require("dateformat");
const displayBill = require("../controllers/displayBill");
router.get("/", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.user = req.session.user;
    bill_md
      .getAllBillByStatus("cho_duyet")
      .then(bill => {
        for (let i = 0; i < bill.length; i++) {
          bill[i].ngay_tao = dateformat(bill[i].ngay_tao, "yyyy-dd-mm");
        }

        data.bill = displayBill.billIsDisplayed(bill);
        res.render("admin/bills/indexChoDuyet", {
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

// giao dien load sach
router.get("/sach", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.user = req.session.user;
    book_md
      .getAllBooks()
      .then(sach => {
        data.sach = sach;
        res.render("admin/sach/index", {
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

// giao diện edit sach
router.get("/sach/edit/:id", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.user = req.session.user;
    let id = req.params.id;
    book_md.getBookById(id).then(sach => {
      data.sach = sach[0];

      book_md
        .getAllCategory()
        .then(category => {
          data.category = category;
          res.render("admin/sach/edit", {
            data: data
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  } else {
    res.redirect("/signin");
  }
});

router.put("/sach/edit", (req, res) => {
  let book = req.body;

  book_md
    .updateBook(book)
    .then(result => {
      res.json({ status_code: 200 });
    })
    .catch(err => {
      res.json({ status_code: 500 });
    });
});

// giao dien load nguoi dung
router.get("/users", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.user = req.session.user;
    user_md
      .getAllUser()
      .then(users => {
        // convert datetime trong sql
        for (let i = 0; i < users.length; i++) {
          users[i].ngay_sinh = dateformat(users[i].ngay_sinh, "dd-mm-yyyy");
        }
        data.users = users;
        res.render("admin/users/index", {
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

// giao diện edit người dùng, bị trùng data.user nên sửa thành data.userSignIn
router.get("/user/edit/:id", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.userSignIn = req.session.user;
    let id = req.params.id;
    user_md
      .getUserById(id)
      .then(users => {
        //convert datetime sql
        users[0].ngay_sinh = dateformat(users[0].ngay_sinh, "yyyy-mm-dd");
        data.user = users[0];
        res.render("admin/users/edit", {
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

// cap nhat nguoi dung
router.put("/user/edit", (req, res) => {
  let data = req.body;

  //new account
  let account = {
    ma_tai_khoan: data.ma_tai_khoan,
    tai_khoan: data.tai_khoan,
    mat_khau: data.mat_khau,
    quyen_su_dung: data.quyen_su_dung
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
    .updateUser(user)
    .then(result => {
      user_md
        .updateAccount(account)
        .then(result => {
          res.json({
            status_code: 200
          });
        })
        .catch(err => {
          res.json({ status_code: 500 });
        });
    })
    .catch(err => {
      res.json({
        status_code: 500
      });
    });
});

// giao diện thêm người dùng
router.get("/user/new", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.user = req.session.user;
    res.render("admin/users/new", {
      data: data
    });
  } else {
    res.redirect("/signin");
  }
});

// xu ly thêm người dùng

router.post("/user/new", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = req.body;
    // console.log(data);
    user_md.getMaxUserId().then(users => {
      data.ma_tai_khoan = users[0].ID_MAX + 1;
      //new account
      let account = {
        ma_tai_khoan: data.ma_tai_khoan,
        tai_khoan: data.tai_khoan,
        mat_khau: data.mat_khau,
        quyen_su_dung: data.quyen_su_dung
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
          let resultAddUser = user_md.addUser(user);
          resultAddUser
            .then(result2 => {
              console.log("Thêm người dùng thành công");
              res.redirect("/admin/users");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  } else {
    res.redirect("/signin");
  }
});

// xoa nguoi dung
router.delete("/user/delete", (req, res) => {
  let ma_tai_khoan = req.body.ma_tai_khoan;

  // Cần xoá trong bảng người dùng trước bảng tài khoản
  user_md
    .deleteUser(ma_tai_khoan)
    .then(result1 => {
      let resultDeleteAccount = user_md.deleteAccount(ma_tai_khoan);
      resultDeleteAccount
        .then(result2 => {
          res.json({
            status_code: 200
          });
        })
        .catch(err => {
          res.json({
            status_code: 500
          });
        });
    })
    .catch(err => {
      res.json({
        status_code: 500
      });
    });
});

// xoa sach
router.delete("/sach/delete", (req, res) => {
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
});

// giao dien load hoa don
router.get("/bills", (req, res) => {
  if (req.session.user && req.session.user.quyen_su_dung == "admin") {
    let data = {};
    data.user = req.session.user;
    bill_md
      .getAllBill()
      .then(bill => {
        for (let i = 0; i < bill.length; i++) {
          bill[i].ngay_tao = dateformat(bill[i].ngay_tao, "yyyy-dd-mm");
        }

        data.bill = displayBill.billIsDisplayed(bill);
        res.render("admin/bills/index", {
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

// xoa bill
router.delete("/bills/delete", (req, res) => {
  let ma_hoa_don_ban = req.body.ma_hoa_don_ban;

  bill_md
    .deleteBillDetailById(ma_hoa_don_ban)
    .then(result => {
      bill_md
        .deleteBillById(ma_hoa_don_ban)
        .then(result => {
          res.json({
            status_code: 200
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      res.json({
        status_code: 500
      });
    });
});

router.get("/bill/accept/:id", (req, res) => {
  let id = req.params.id;

  bill_md
    .updateNewStatusForBill(id, "da_duyet")
    .then(result => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/sach/edit", (req, res) => {
  let data = req.body;
  console.log(data);
  book_md
    .updateBook(data)
    .then(result => {
      res.redirect("/admin/sach");
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get("/random/sach", (req, res) => {
//   importRandom.addRandomSach();
//   res.json("add random sach success");
// });

// router.get("/random/user", (req, res) => {
//   importRandom.addRandomUser();
//   res.json("add random user success");
// });
module.exports = router;
