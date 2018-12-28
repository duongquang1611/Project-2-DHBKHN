function userinfo() {
  function onclick() {
    $(".user-edit").click(function(e) {
      var params = {
        ma_tai_khoan: $(".ma_tai_khoan").val(),
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
        type: "PUT",
        url: base_url + "/users/info",
        data: params,
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            location.reload();
          }
        }
      });
    });
  }

  onclick();
}

$(document).ready(function() {
  new userinfo();
});
