$(document).ready(function () {
  function showAddCropPopup() {
    $(".add-crop-popup").fadeIn();
  }

  // Show add crop popup
  $(".add-crop-button").on("click", function () {
    showAddCropPopup();
  });
});
