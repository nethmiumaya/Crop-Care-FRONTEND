$(document).ready(function () {
  function closeAddStaffPopup() {
    $(".add-staff-popup").fadeOut();
  }
  function showUpdateEquipmentPopup() {
    $(".update-staff-popup").fadeIn();
  }
  $(".back-btn").on("click", function () {
    closeAddStaffPopup();
  });
  $(".edit").on("click", function () {
    showUpdateEquipmentPopup();
  });
});
