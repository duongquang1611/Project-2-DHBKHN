const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const addBill = bill => {
  if (bill) {
    let defer = q.defer();

    connection.query("INSERT INTO hoa_don_ban SET ?", bill, (err, result) => {
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

const addBillDetail = bill => {
  if (bill) {
    let defer = q.defer();

    connection.query(
      "INSERT INTO chi_tiet_hoa_don_ban SET ?",
      bill,
      (err, result) => {
        if (err) defer.reject(err);
        else {
          //   console.log(sql);
          defer.resolve(result);
        }
      }
    );
    return defer.promise;
  }
  return false;
};

const getMaxBillId = () => {
  let defer = q.defer();
  // lấy mã tài khoản max dưới dạng number
  let sql =
    "SELECT MAX(CAST(ma_hoa_don_ban AS UNSIGNED)) AS ID_MAX FROM hoa_don_ban";
  connection.query(sql, (err, result) => {
    if (err) {
      defer.reject(err);
    } else defer.resolve(result);
  });
  return defer.promise;
};

const getBillsById = id => {
  let defer = q.defer();
  let sql = "SELECT * FROM hoa_don_ban WHERE ma_tai_khoan = ?";
  connection.query(sql, id, (err, result) => {
    if (err) {
      defer.reject(err);
    } else defer.resolve(result);
  });
  return defer.promise;
};

const getDetailBillsByBillId = billId => {
  let defer = q.defer();
  let sql = "SELECT * FROM chi_tiet_hoa_don_ban WHERE ma_hoa_don_ban = ?";
  connection.query(sql, billId, (err, result) => {
    if (err) {
      defer.reject(err);
    } else defer.resolve(result);
  });
  return defer.promise;
};

const getAllBillByStatus = status => {
  let defer = q.defer();
  let sql =
    "SELECT * " +
    "FROM sach as s,hoa_don_ban as hdb ,chi_tiet_hoa_don_ban as cthdb ,nguoi_dung as nd " +
    "WHERE cthdb.ma_sach = s.ma_sach AND hdb.ma_tai_khoan = nd.ma_tai_khoan AND hdb.ma_hoa_don_ban = cthdb.ma_hoa_don_ban AND hdb.trang_thai_don= ?";
  connection.query(sql, status, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

const getAllBill = () => {
  let defer = q.defer();
  let sql =
    "SELECT * " +
    "FROM sach as s,hoa_don_ban as hdb ,chi_tiet_hoa_don_ban as cthdb ,nguoi_dung as nd " +
    "WHERE cthdb.ma_sach = s.ma_sach AND hdb.ma_tai_khoan = nd.ma_tai_khoan AND hdb.ma_hoa_don_ban = cthdb.ma_hoa_don_ban";
  connection.query(sql, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

const deleteBillById = ma_hoa_don_ban => {
  let defer = q.defer();

  let sql = "DELETE FROM hoa_don_ban WHERE ma_hoa_don_ban = ?";
  connection.query(sql, ma_hoa_don_ban, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};
const deleteBillDetailById = ma_hoa_don_ban => {
  let defer = q.defer();

  let sql = "DELETE FROM chi_tiet_hoa_don_ban WHERE ma_hoa_don_ban = ?";
  connection.query(sql, ma_hoa_don_ban, (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

const updateNewStatusForBill = (ma_hoa_don_ban, new_status) => {
  let defer = q.defer();

  let sql =
    "UPDATE hoa_don_ban SET trang_thai_don = ? WHERE ma_hoa_don_ban = ?";
  connection.query(sql, [new_status, ma_hoa_don_ban], (err, result) => {
    if (err) defer.reject(err);
    else defer.resolve(result);
  });
  return defer.promise;
};

module.exports = {
  addBill: addBill,
  getMaxBillId: getMaxBillId,
  addBillDetail: addBillDetail,
  getBillsById: getBillsById,
  getDetailBillsByBillId: getDetailBillsByBillId,
  getAllBillByStatus: getAllBillByStatus,
  getAllBill: getAllBill,
  deleteBillById: deleteBillById,
  deleteBillDetailById: deleteBillDetailById,
  updateNewStatusForBill: updateNewStatusForBill
};
