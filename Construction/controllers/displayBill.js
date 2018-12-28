const billIsDisplayed = bills => {
  let maHDB_arr = [];
  let billIsDisplayed = [];
  let checkAdd = true;
  let indexMaHDB_arr = 0;

  for (let i = 0; i < bills.length; i++) {
    for (let j = 0; j < maHDB_arr.length; j++) {
      if (maHDB_arr[j] != bills[i].ma_hoa_don_ban) checkAdd = true;
      else {
        checkAdd = false;
        indexMaHDB_arr = j;
        break;
      }
    }

    if (checkAdd) {
      maHDB_arr.push(bills[i].ma_hoa_don_ban);
      billIsDisplayed.push({
        ma_hoa_don_ban: bills[i].ma_hoa_don_ban,
        ho_ten: bills[i].ho_ten,
        ngay_tao: bills[i].ngay_tao,
        id_shipper: bills[i].id_shipper,
        san_pham: [
          {
            ma_sach: bills[i].ma_sach,
            ten_sach: bills[i].ten_sach,
            so_luong: bills[i].so_luong
          }
        ],
        trang_thai_don: bills[i].trang_thai_don
      });
    } else {
      billIsDisplayed[indexMaHDB_arr].san_pham.push({
        ma_sach: bills[i].ma_sach,
        ten_sach: bills[i].ten_sach,
        so_luong: bills[i].so_luong
      });
    }
  }

  return billIsDisplayed;
};

module.exports = {
  billIsDisplayed: billIsDisplayed
};
