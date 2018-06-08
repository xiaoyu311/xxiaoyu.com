$(document).ready(function() {
  $('#side-menu').metisMenu();
  $('.navbar-minimalize').click(function() {
    $('body').toggleClass('mini-navbar');
  });
});
function SmoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    $('side-menu').hide();
  }
}