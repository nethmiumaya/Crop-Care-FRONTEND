$(document).ready(function () {
  function closeUpdateVehiclePopup() {
    $(".update-vehicle-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeUpdateVehiclePopup();
  });
});
