const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

// các hàm liên quan tới bảng tài khoản
// them tai khoan
const addAccount = account => {
  if (account) {
    let defer = q.defer();

    connection.query("INSERT INTO tai_khoan SET ?", account, (err, result) => {
      if (err) defer.reject(err);
      else {
        defer.resolve(result);
      }
    });
    return defer.promise;
  }
  return false;
};

// các hàm liên quan tới bảng người dùng

let getAllUser = () => {
  let defer = q.defer();
  connection.query(
    "SELECT * FROM nguoi_dung NATURAL JOIN tai_khoan",
    (err, rows) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(rows);
      }
    }
  );

  return defer.promise;
};

let getUserById = id => {
  let defer = q.defer();
  connection.query(
    "SELECT * FROM nguoi_dung NATURAL JOIN tai_khoan WHERE ma_tai_khoan = ?",
    id,
    (err, rows) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(rows);
      }
    }
  );

  return defer.promise;
};

// lay thong tin nguoi dung khi signin
const getUserByUsername = username => {
  let defer = q.defer();
  let sql =
    "SELECT * FROM nguoi_dung NATURAL JOIN tai_khoan WHERE tai_khoan = ?";
  connection.query(sql, username, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

const addUser = user => {
  if (user) {
    let defer = q.defer();

    connection.query("INSERT INTO nguoi_dung SET ?", user, (err, result) => {
      if (err) defer.reject(err);
      else {
        //   console.log(sql);
        defer.resolve(result);
      }
    });
    return defer.promise;
  }
  return false;
};

const getTotalUser = () => {
  let defer = q.defer();
  let sql = "SELECT COUNT(ma_tai_khoan) as totalUser FROM nguoi_dung";
  connection.query(sql, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

const getMaxUserId = () => {
  let defer = q.defer();
  // lấy mã tài khoản max dưới dạng number
  let sql =
    "SELECT MAX(CAST(ma_tai_khoan AS UNSIGNED)) AS ID_MAX FROM nguoi_dung";
  connection.query(sql, (err, result) => {
    if (err) {
      defer.reject(err);
    } else defer.resolve(result);
  });
  return defer.promise;
};

// xoa user
const deleteUser = ma_tai_khoan => {
  let defer = q.defer();

  let sql = "DELETE FROM nguoi_dung WHERE ma_tai_khoan = ?";
  connection.query(sql, ma_tai_khoan, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

// xoá tài khoản
const deleteAccount = ma_tai_khoan => {
  let defer = q.defer();

  let sql = "DELETE FROM nguoi_dung WHERE ma_tai_khoan = ?";
  connection.query(sql, ma_tai_khoan, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

//update information
const updateUser = user => {
  let defer = q.defer();

  let sql =
    "UPDATE nguoi_dung SET ho_ten = ?, dia_chi = ?, sdt = ?, ngay_sinh = ?, gioi_tinh = ?, email = ? WHERE ma_tai_khoan = ?;";
  connection.query(
    sql,
    [
      user.ho_ten,
      user.dia_chi,
      user.sdt,
      user.ngay_sinh,
      user.gioi_tinh,
      user.email,
      user.ma_tai_khoan
    ],
    (err, rows) => {
      if (err) defer.reject(err);
      else defer.resolve(rows);
    }
  );

  return defer.promise;
};
//update information
const updateAccount = account => {
  let defer = q.defer();

  let sql = "UPDATE tai_khoan SET ? WHERE (ma_tai_khoan = ?);";
  connection.query(sql, [account, account.ma_tai_khoan], (err, rows) => {
    if (err) defer.reject(err);
    else defer.resolve(rows);
  });

  return defer.promise;
};

module.exports = {
  getAllUser: getAllUser,
  getUserById: getUserById,
  addUser: addUser,
  getTotalUser: getTotalUser,
  getMaxUserId: getMaxUserId,
  getUserByUsername: getUserByUsername,
  addAccount: addAccount,
  deleteUser: deleteUser,
  deleteAccount: deleteAccount,
  updateUser: updateUser,
  updateAccount: updateAccount
};
