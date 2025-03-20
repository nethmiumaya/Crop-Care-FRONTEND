$(document).ready(function () {
  function closeupdateLoPopup() {
    $(".update-log-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeupdateLoPopup();
  });
});
