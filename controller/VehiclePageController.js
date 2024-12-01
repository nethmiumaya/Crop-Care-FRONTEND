$(document).ready(function () {
  function showAddVehiclePopup() {
    $(".add-vehicle-popup").fadeIn();
  }

  // Show add vehicle popup
  $(".add-vehicle-button").on("click", function () {
    showAddVehiclePopup();
  });
});
