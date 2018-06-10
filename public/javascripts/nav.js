$(function() {
  $('._navbar_container li').on('click', function() {
    $(this).addClass("active").siblings().removeClass("active");
  });
}); 