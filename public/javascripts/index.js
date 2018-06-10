$(function () {
  // sidebar
  // $('#cate_type').children().eq(0).addClass('_nav_item_active').siblings().removeClass('_nav_item_active');
  // nav
  $('.cate_item').on('click', function() {
    // $(this).addClass('_nav_item_active').siblings().removeClass('_nav_item_active');
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