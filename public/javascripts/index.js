$(function () {
  // sidebar
  // nav
  
  $('.cate_item').on('click', function() {
    var index = $(this).index();
    $("#_background").animate({
      top: (index -1) * 57 + 'px',
    }, 300);
  });

  // 阴影
  $('._content_item').on('click', function() {
    $('.mask').fadeIn(300);
    $('.mask_content').addClass('mask_content_show');
  });
  $('.mask').on('click', function() {
    $(this).fadeOut(300);
    $('.mask_content').removeClass('mask_content_show');
  });
});