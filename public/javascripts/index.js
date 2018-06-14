$(function () {
  // 阴影
  $('._content_item').on('click', function (event) {
    var currentId = $(event.target).attr('id');
    var _id = $(this).attr('_id');
    var title = $(this).attr('title');
    var url = window.location.pathname;
    if (currentId != 'target_url') {
      $('.mask').fadeIn(300);
      $('.mask_content').addClass('mask_content_show');
    }
    $('.header_title').children().text(title);
    setTimeout(function(){
      $.ajax({
        type: 'GET',
        url: url + '/' + _id,
        dataType: 'json',
        success: function(res) {
          if (res.status) {
            $('.my_load').css('display', 'none');
            $('.detail_content').css('display', 'block');
            $('.mask_content').children('main').append(
              '<div class="detail_content">' + res.data.Content + '</div>'
            );
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    }, 500)
  });
  $('.mask').on('click', function () {
    $(this).fadeOut(300);
    $('.mask_content').removeClass('mask_content_show');
    $('.my_load').css('display', 'flex');
    $('.detail_content').css('display', 'none');
  });
});