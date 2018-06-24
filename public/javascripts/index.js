$(document).ready(function() {
  var page = 1;
  $.contentShow = function(event, that) {
    var currentId = $(event.target).attr('id');
    var _id = $(that).attr('_id');
    var title = $(that).attr('title');
    var url = window.location.pathname;
    var element = '';
    if (currentId == 'target_url') return;
    $('.mask').fadeIn(300);
    $('.mask_content').addClass('mask_content_show');
    $('.header_title').children().text(title);
    setTimeout(function () {
      $.ajax({
        type: 'GET',
        url: url + '/' + _id,
        dataType: 'json',
        success: function (res) {
          if (res.status) {
            $('#article_content .my_load').css('display', 'none');
            $('.detail_content').css('display', 'block');
            for (var i = 0; i < res.data.Labels.length; i++) {
              element += ('<span class="label_item">' + res.data.Labels[i] + '</span>')
            }
            if (element) {
              $('.labels').append(element);
              var footerHeight = $('#footer_btn').height();
              $('#article_content').css('bottom', footerHeight + 20 + 'px');
            }
            $('.mask_content').children('main').append(
              '<div class="detail_content">' + res.data.Content + '</div>'
            );
          }
        },
        error: function (err) {
          console.log(err);
        }
      });
    }, 500)
  }
  $('.next_page_text').on('click', function() {
    $(this).css('display', 'none');
    $('.next_page_container .my_load').css('visibility', 'visible');
    setTimeout(function() {
      $.ajax({
        type: 'GET',
        url: `/article/all/${page}`,
        success: function(res) {
          $('.next_page_text').css('display', 'block');
          $('.next_page_container .my_load').css('visibility', 'hidden');
          if (res.status) {
            res.ArticleList.forEach(item => {
              $('._main-wrapper .navbar-nav').append(
                `<li class='nav-item _content_item', onclick='$.contentShow(event, this)', _id='${item._id}', title='${item.Title}', Labels='${item.Labels}'>
                  <div>
                    <section style='margin-top: 15px;'>
                      <h4 style='margin: 0;'>
                        <a class='_main_title' href='#'>
                          ${item.Title}
                        </a>
                      </h4>
                    </section>
                    <section class='d-flex justify-content-between' style='margin-top: 10px;'>
                      <div>
                        <span class='_type _type_margin'>
                          <i class='fa fa-map-signs'></i>
                          <span class='_margin_right'>${item.CateName}</span>
                        </span>
                        <span class='_type _type_margin'>
                          <i class='fas fa-clock'></i>
                          <span class='_margin_right'>2016-04-04</span>
                        </span>
                      </div>
                      <div class='_alias' style='${item.Url ? 'display: block' : 'display: none'}'>
                        <i class='fas fa-globe'></i>
                        <a class='target_url' id='target_url' href='${item.Url}'>${item.Url}</a>
                      </div>
                    </section>
                    <section style='margin-top: 10px;'>
                      <span class='_content'>${item.Summary}</span>
                    </section>
                  </div> 
                </li>`
              );
              page += 1;
            });
          }
        }
      });
    }, 500)
  });
  $('.mask').on('click', function () {
    maskHide();
  });
  $('.btn_closs').on('click', function() {
    maskHide();
  });
  function maskHide() {
    $('.mask').fadeOut(300);
    $('.mask_content').removeClass('mask_content_show');
    $('#article_content .my_load').css('display', 'flex');
    $('.detail_content').css('display', 'none');
    $('#article_content').css('bottom', 0);
    element = '';
    $('.label_item').remove();
  }

  $('.dropdown-toggle').on('click', function() {
    $(this).parent().toggleClass('show');
    $(this).parent().children('.dropdown-menu').toggleClass('show');
  });

  $('.dropdown-item').on('click', function() {
    var text = $(this).attr('data-set');
    $('.dropdown-toggle').parent().removeClass('show');
    $('.dropdown-toggle').parent().children('.dropdown-menu').removeClass('show');
    $('.dropdown-toggle').text(text);
    $('._title_text').text(text);
  })
});