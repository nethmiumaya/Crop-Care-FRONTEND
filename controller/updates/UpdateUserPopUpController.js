$(document).ready(function () {
  function closeupdateUserPopup() {
    $(".update-user-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeupdateUserPopup();
  });
});
