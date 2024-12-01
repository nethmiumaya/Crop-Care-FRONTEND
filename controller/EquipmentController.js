$(document).ready(function () {
  function showAddEquipmentPopup() {
    $(".add-equipment-popup").fadeIn();
  }
  $(".add-equipment-button").on("click", function () {
    showAddEquipmentPopup();
  });
});
