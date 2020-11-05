$(document).ready(function ($) {
  $(".x-touch").on("click", function (e) {
    $("body").css({
      overflow: "auto",
    });
    $(".preview-modal").removeClass("preview-modal-show");
  });
});
