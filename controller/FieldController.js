$(document).ready(function () {
  function showAddFieldPopup() {
    $(".add-field-popup").fadeIn();
  }

  // Show add field popup
  $(".add-field-button").on("click", function () {
    showAddFieldPopup();
  });
});
