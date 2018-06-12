$(function () {
  // $('#cate_type').children().eq(0).addClass('_nav_item_active').siblings().removeClass('_nav_item_active');
  // $('.cate_item').on('click', function () {
  //   $(this).addClass('_nav_item_active').siblings().removeClass('_nav_item_active');
  // })
  // 阴影
  $('._content_item').on('click', function () {
    $('.mask').fadeIn(300);
    $('.mask_content').addClass('mask_content_show');
  });
  $('.mask').on('click', function () {
    $(this).fadeOut(300);
    $('.mask_content').removeClass('mask_content_show');
  });
});