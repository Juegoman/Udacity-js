var $pepe = $('#pepe'), $count = $('#count'), currentCount;

$(document).ready(function() {
  $pepe.click(function(e) {
    currentCount = parseInt($count.text());
    $count.text(currentCount + 1 + "");
  });
});
