function user() {
  function onClick() {
    $(".user_delete").click(function(e) {
      let ma_tai_khoan = $(this).attr("ma_tai_khoan");
      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;
      $.ajax({
        url: base_url + "/admin/user/delete",
        type: "DELETE",
        data: { ma_tai_khoan: ma_tai_khoan },
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            location.reload();
          }
        }
      });
    });

    // update user
    $(".user_update").click(function(e) {
      let userData = {
        ma_tai_khoan: $(".ma_tai_khoan").val(),
        tai_khoan: $(".tai_khoan").val(),
        mat_khau: $(".mat_khau").val(),
        quyen_su_dung: $(".quyen_su_dung").val(),
        ho_ten: $(".ho_ten").val(),
        dia_chi: $(".dia_chi").val(),
        sdt: $(".sdt").val(),
        ngay_sinh: $(".ngay_sinh").val(),
        gioi_tinh: $(".gioi_tinh").val(),
        email: $(".email").val()
      };

      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;

      $.ajax({
        url: base_url + "/admin/user/edit",
        type: "PUT",
        data: userData,
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            // alert("Cập nhật thành công");
            // console.log("cap nhat thanh cong");
            location.reload();
          }
        }
      });
    });
  }
  onClick();
}

$(document).ready(function() {
  new user();
});
