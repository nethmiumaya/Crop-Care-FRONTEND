$(document).ready(function () {
  function closeAddFieldPopup() {
    $(".add-field-popup").fadeOut();
  }
  function showUpdateFieldPopup() {
    $(".update-field-popup").fadeIn();
  }
  $(".back-btn").on("click", function () {
    closeAddFieldPopup();
  });
  $(".edit").on("click", function () {
    showUpdateFieldPopup();
  });
});
