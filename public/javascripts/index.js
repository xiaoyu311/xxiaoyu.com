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
  $('#button').on('click', function () {
    var fileReader = new FileReader();
    var formData = new FormData(); 
    console.log(document.getElementById('file').files[0]);
    fileReader.readAsDataURL(document.getElementById('file').files[0]);
    fileReader.onload = function() {
      document.getElementById('show').src = this.result
      formData.append('Img', this.result)
      var xhr = new XMLHttpRequest();
      xhr.open('post', '/admin/saveCategories', true);
      xhr.send(formData)
    }
  })
});