function bill() {
  function onClick() {
    // admin, xoá đơn
    $(".delete_bill_admin").click(function(e) {
      let ma_hoa_don_ban = $(this).attr("ma_hoa_don_ban");
      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;
      $.ajax({
        url: base_url + "/admin/bills/delete",
        type: "DELETE",
        data: {
          ma_hoa_don_ban: ma_hoa_don_ban
        },
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            location.reload();
          }
        }
      });
    });

    // thanh toan kế toán
    // $(".thanh_toan_button").click(function(e) {
    //   let billData = {
    //     ma_hoa_don_ban: $(".ma_hoa_don_ban").val(),
    //     san_pham: $(".san_pham").val()
    //   };

    //   var base_url =
    //     location.protocol + "//" + document.domain + ":" + location.port;

    //   $.ajax({
    //     url: base_url + "/ketoan",
    //     type: "PUT",
    //     data: billData,
    //     dataType: "json",
    //     success: function(res) {
    //       if (res && res.status_code == 200) {
    //         // alert("Cập nhật thành công");
    //         // console.log("cap nhat thanh cong");
    //         location.reload();
    //       }
    //     }
    //   });
    // });

    // huy don ke toan
    $(".delete_bill_ketoan").click(function(e) {
      let ma_hoa_don_ban = $(this).attr("ma_hoa_don_ban");
      var base_url =
        location.protocol + "//" + document.domain + ":" + location.port;
      $.ajax({
        url: base_url + "/ketoan/bills/delete",
        type: "DELETE",
        data: {
          ma_hoa_don_ban: ma_hoa_don_ban
        },
        dataType: "json",
        success: function(res) {
          if (res && res.status_code == 200) {
            location.reload();
          }
        }
      });
    });
  }

  onClick();
}

$(document).ready(function() {
  new bill();
});
