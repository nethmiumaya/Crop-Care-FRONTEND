$(document).ready(function () {
  function showAddFieldPopup() {
    $(".add-user-popup").fadeIn();
  }

  // Show add user popup
  $(".add-user-button").on("click", function () {
    showAddFieldPopup();
  });
});
