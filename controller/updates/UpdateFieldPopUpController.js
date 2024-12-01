$(document).ready(function () {
  function closeUpdateFieldPopup() {
    $(".update-field-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeUpdateFieldPopup();
  });
});
