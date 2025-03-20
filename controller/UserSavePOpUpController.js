$(document).ready(function () {
  function closeAddUserPopup() {
    $(".add-user-popup").fadeOut();
  }
  function showUpdateUserPopup() {
    $(".update-user-popup").fadeIn();
  }
  $(".back-btn").on("click", function () {
    closeAddUserPopup();
  });
  $(".edit").on("click", function () {
    showUpdateUserPopup();
  });
});
