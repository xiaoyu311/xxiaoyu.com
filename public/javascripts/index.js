$(function () {
  // 阴影
  $('._content_item').on('click', function (event) {
    var currentId = $(event.target).attr('id');
    if (currentId != 'target_url') {
      $('.mask').fadeIn(300);
      $('.mask_content').addClass('mask_content_show');
    }
  });
  $('.mask').on('click', function () {
    $(this).fadeOut(300);
    $('.mask_content').removeClass('mask_content_show');
  });
  $('#button').on('click', function() {
    
    //检验是否为图像文件
    var file = document.getElementById("one").files[0];
    var reader = new FileReader();
    //将文件以Data URL形式读入页面
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      console.log(reader.result)
      var formdata = new FormData()

      formdata.append('imgData', reader.result)
      console.log(formdata)
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/admin/uploadimg', true);
      xhr.send(formdata);
      // $.ajax({
      //   type: 'post',
      //   url: '/admin/uploadimg',
      //   dataType: 'json',
      //   data: formdata,
      //   cache: false,
      //     processData: false,
      //   success: function(res) {
      //     console.log(res);
      //   },
      //   error: function(err) {
      //     console.log(err)
      //   }
      // })
      //显示文件
    }
  })
});