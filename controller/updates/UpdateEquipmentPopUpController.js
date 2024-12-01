$(document).ready(function () {
  function closeUpdateEquipmentPopup() {
    $(".update-equipment-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeUpdateEquipmentPopup();
  });
});
