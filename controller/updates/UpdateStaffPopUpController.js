$(document).ready(function () {
  function closeupdateStaffPopup() {
    $(".update-staff-popup").fadeOut();
  }

  $(".back-btn").on("click", function () {
    closeupdateStaffPopup();
  });
});
