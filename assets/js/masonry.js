<<<<<<< HEAD
$(document).ready(function() {
  // Init Masonry
  var $grid = $('.grid').masonry({
    gutter: 10,
    horizontalOrder: true,
    itemSelector: '.grid-item',
  });
  // Layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
=======
$(document).ready(function () {
  // Init Masonry
  var $grid = $(".grid").masonry({
    gutter: 10,
    horizontalOrder: true,
    itemSelector: ".grid-item",
  });
  // Layout Masonry after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.masonry("layout");
>>>>>>> 73bfa517 (Initial commit)
  });
});
