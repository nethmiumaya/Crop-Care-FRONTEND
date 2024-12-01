$(document).ready(function () {
  function showAddStaffPopup() {
    $(".add-staff-popup").fadeIn();
  }

  // Show add staff popup
  $(".add-staff-button").on("click", function () {
    showAddStaffPopup();
  });
});
