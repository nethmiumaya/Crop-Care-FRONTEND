$(document).ready(function () {
  function showViewStaffPopup() {
    $(".view-staff-popup").fadeIn();
  }

  function closeViewStaffPopup() {
    $(".view-staff-popup").fadeOut();
  }

  $(".action-button.view").on("click", function () {
    // Populate the popup with staff details
    const row = $(this).closest("tr");
    $("#view-first-name").text(row.find("td:nth-child(1)").text());
    $("#view-last-name").text(row.find("td:nth-child(2)").text());
    $("#view-designation").text(row.find("td:nth-child(3)").text());
    $("#view-gender").text(row.find("td:nth-child(4)").text());
    $("#view-contact-no").text(row.find("td:nth-child(5)").text());
    $("#view-email").text(row.find("td:nth-child(6)").text());
    $("#view-address").text(row.find("td:nth-child(7)").text());

    showViewStaffPopup();
  });

  $("#closeButton").on("click", function () {
    closeViewStaffPopup();
  });
});
