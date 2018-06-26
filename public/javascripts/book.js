$(document).ready(function() {
  $('.book_item').children('a').on('mouseenter', function() {
    $(this).parent().children('.book_show').css('transform', 'rotateY(180deg)');
    $(this).parent().children('.book_mask').css({
      'z-index': 2,
      'transform': 'rotateY(0deg)'
    }); 
  });
  $('.book_item').children('a').on('mouseleave', function() {
    $(this).parent().children('.book_show').css('transform', 'rotateY(0)');
    $(this).parent().children('.book_mask').css({
      'z-index': -1,
      'transform': 'rotateY(-180deg)'
    });
  });
});