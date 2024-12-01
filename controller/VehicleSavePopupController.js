$(document).ready(function () {
  function closeAddVehiclePopup() {
    $(".add-vehicle-popup").fadeOut();
  }
  function showAddVehiclePopup() {
    $(".update-vehicle-popup").fadeIn();
  }

  $(".back-btn").on("click", function () {
    closeAddVehiclePopup();
  });
  $(".edit").on("click", function () {
    showAddVehiclePopup();
  });
});
