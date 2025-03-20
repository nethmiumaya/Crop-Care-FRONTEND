$(document).ready(function () {
  function closeAddCropPopup() {
    $(".update-crop-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeAddCropPopup();
  });
});
