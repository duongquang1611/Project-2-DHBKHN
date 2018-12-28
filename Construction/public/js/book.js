function book() {
  function onClick() {
    // admin
    $(".delete_book_admin").click(function(e) {
      let ma_sach = $(this).attr("ma_sach");
      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;
      $.ajax({
        url: base_url + "/admin/sach/delete",
        type: "DELETE",
        data: {
          ma_sach: ma_sach
        },
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            location.reload();
          }
        }
      });
    });

    $(".update_book_admin").click(function(e) {
      let bookData = {
        ma_sach: $(".ma_sach").val(),
        ma_the_loai: $(".ma_the_loai").val(),
        ten_sach: $(".ten_sach").val(),
        tac_gia: $(".tac_gia").val(),
        nha_xuat_ban: $(".nha_xuat_ban").val(),
        nam_xuat_ban: $(".nam_xuat_ban").val(),
        so_luong: $(".so_luong").val(),
        gia_nhap: $(".gia_nhap").val(),
        gia_ban: $(".gia_ban").val()
      };

      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;

      $.ajax({
        url: base_url + "/admin/sach/edit",
        type: "PUT",
        data: bookData,
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

    // thu kho
    $(".delete_book_thukho").click(function(e) {
      let ma_sach = $(this).attr("ma_sach");
      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;
      $.ajax({
        url: base_url + "/thukho/sach/delete",
        type: "DELETE",
        data: {
          ma_sach: ma_sach
        },
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            location.reload();
          }
        }
      });
    });

    $(".update_book_thukho").click(function(e) {
      let data = {
        ma_sach: $(".ma_sach").val(),
        ma_the_loai: $(".ma_the_loai").val(),
        ten_sach: $(".ten_sach").val(),
        tac_gia: $(".tac_gia").val(),
        nha_xuat_ban: $(".nha_xuat_ban").val(),
        nam_xuat_ban: $(".nam_xuat_ban").val(),
        so_luong: $(".so_luong").val(),
        gia_nhap: $(".gia_nhap").val(),
        gia_ban: $(".gia_ban").val()
      };

      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;

      $.ajax({
        url: base_url + "/thukho/sach/edit",
        type: "PUT",
        data: data,
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
  new book();
});
