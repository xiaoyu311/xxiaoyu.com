$(function () {
  // 阴影
  $('._content_item').on('click', function (event) {
    var currentId = $(event.target).attr('id');
    var _id = $(this).attr('_id');
    var url = window.location.pathname;
    if (currentId != 'target_url') {
      $('.mask').fadeIn(300);
      $('.mask_content').addClass('mask_content_show');
    }
    console.log(window)
    $.ajax({
      type: 'GET',
      url: url + '/' + _id,
      dataType: 'json',
      success: function(res) {
        if (res.status) {
          console.log(res.data)
          // $('.mask_content').append(res.data.Content);
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
  $('.mask').on('click', function () {
    $(this).fadeOut(300);
    $('.mask_content').removeClass('mask_content_show');
  });
});