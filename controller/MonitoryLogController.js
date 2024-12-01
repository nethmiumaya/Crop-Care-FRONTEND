$(document).ready(function () {
  function showAddMonitoryLogPopup() {
    $(".add-log-popup").fadeIn();
  }

  // Show add staff popup
  $(".add-log-button").on("click", function () {
    showAddMonitoryLogPopup();
  });
});
