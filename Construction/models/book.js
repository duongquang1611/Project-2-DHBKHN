const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

let getAllBooks = () => {
  let defer = q.defer();
  connection.query("SELECT * FROM sach NATURAL JOIN the_loai", (err, rows) => {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(rows);
    }
  });

  return defer.promise;
};

let getBookById = id => {
  let defer = q.defer();
  connection.query(
    "SELECT * FROM sach NATURAL JOIN the_loai WHERE ma_sach = ?",
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

const addBook = sach => {
  if (sach) {
    let defer = q.defer();

    connection.query("INSERT INTO sach SET ?", sach, (err, result) => {
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

//update information
const updateBook = book => {
  let defer = q.defer();

  let sql = "UPDATE sach SET ? WHERE ma_sach = ?";
  connection.query(sql, [book, book.ma_sach], (err, rows) => {
    if (err) defer.reject(err);
    else defer.resolve(rows);
  });

  return defer.promise;
};

const getBookByCategory = category => {
  let defer = q.defer();
  connection.query(
    "SELECT * FROM sach NATURAL JOIN the_loai WHERE sach.ma_the_loai = ?",
    category,
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

const getTotalBook = () => {
  let defer = q.defer();
  let sql = "SELECT SUM(so_luong) as totalBook FROM sach";
  connection.query(sql, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

// xoa sach
const deleteBook = ma_sach => {
  let defer = q.defer();

  let sql = "DELETE FROM sach WHERE ma_sach = ?";
  connection.query(sql, ma_sach, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

const getAllCategory = () => {
  let defer = q.defer();
  connection.query("SELECT * FROM the_loai", (err, rows) => {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(rows);
    }
  });

  return defer.promise;
};

const getMaxBookId = () => {
  let defer = q.defer();
  // lấy mã tài khoản max dưới dạng number
  let sql = "SELECT MAX(CAST(ma_sach AS UNSIGNED)) AS ID_MAX FROM sach";
  connection.query(sql, (err, result) => {
    if (err) {
      defer.reject(err);
    } else defer.resolve(result);
  });
  return defer.promise;
};

const getBooksByName = name => {
  let defer = q.defer();
  connection.query(
    "SELECT DISTINCT * FROM sach NATURAL JOIN the_loai WHERE sach.ten_sach like ?",
    "%" + name + "%",
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

const getBooksByAuthor = author => {
  let defer = q.defer();
  connection.query(
    "SELECT DISTINCT * FROM sach NATURAL JOIN the_loai WHERE sach.tac_gia LIKE ?",
    "%" + author + "%",
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

const getBooksByCompany = company => {
  let defer = q.defer();
  connection.query(
    "SELECT DISTINCT * FROM sach NATURAL JOIN the_loai WHERE sach.nha_xuat_ban like ?",
    "%" + company + "%",
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

const getBooksByCategoryName = category => {
  let defer = q.defer();
  connection.query(
    "SELECT DISTINCT * FROM sach NATURAL JOIN the_loai WHERE ten_the_loai like ?",
    "%" + category + "%",
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

// thay đổi số lượng sách theo mã sách
const minusBooks = (id, quantum) => {
  let defer = q.defer();
  connection.query(
    "UPDATE sach SET so_luong = ? WHERE ma_sach = ?",
    [quantum, id],
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

// lấy số lượng sách theo mã sách
const getQuantumById = id => {
  let defer = q.defer();
  connection.query(
    "SELECT so_luong FROM sach WHERE ma_sach = ?",
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

module.exports = {
  getAllBooks: getAllBooks,
  getBookById: getBookById,
  addBook: addBook,
  getBookByCategory: getBookByCategory,
  getTotalBook: getTotalBook,
  deleteBook: deleteBook,
  getAllCategory: getAllCategory,
  getMaxBookId: getMaxBookId,
  getBooksByName: getBooksByName,
  getBooksByAuthor: getBooksByAuthor,
  getBooksByCompany: getBooksByCompany,
  getBooksByCategoryName: getBooksByCategoryName,
  minusBooks: minusBooks,
  updateBook: updateBook,
  getQuantumById: getQuantumById
};
