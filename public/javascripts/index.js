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
});