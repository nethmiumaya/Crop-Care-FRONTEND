$(document).ready(function () {
  function closeAddLogPopup() {
    $(".add-log-popup").fadeOut();
  }
  function showUpdateLogPopup() {
    $(".update-log-popup").fadeIn();
  }

  $(".back-btn").on("click", function () {
    closeAddLogPopup();
  });
  $(".edit").on("click", function () {
    showUpdateLogPopup();
  });
});
