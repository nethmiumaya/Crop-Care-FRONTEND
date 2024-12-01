$(document).ready(function () {
  function showAddEquipmentPopup() {
    $(".add-equipment-popup").fadeIn();
  }

  function closeAddEquipmentPopup() {
    $(".add-equipment-popup").fadeOut();
  }

  $(".add-equipment-button").on("click", function () {
    showAddEquipmentPopup();
  });

  $(".back-btn").on("click", function () {
    closeAddEquipmentPopup();
  });
});
function showUpdateEquipmentPopup() {
  $(".update-equipment-popup").fadeIn();
}

$(".edit").on("click", function () {
  showUpdateEquipmentPopup();
});
