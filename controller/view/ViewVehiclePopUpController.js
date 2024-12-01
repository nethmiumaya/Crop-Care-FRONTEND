$(document).ready(function () {
  function showViewVehiclePopup() {
    $(".view-vehicle-popup").fadeIn();
  }

  function closeViewVehiclePopup() {
    $(".view-vehicle-popup").fadeOut();
  }

  $(".action-button.view").on("click", function () {
    // Populate the popup with vehicle details
    const row = $(this).closest("tr");
    $("#view-license-plate").text(row.find("td:nth-child(1)").text());
    $("#view-fuel").text(row.find("td:nth-child(3)").text());
    $("#view-remark").text(row.find("td:nth-child(4)").text());
    $("#view-category").text(row.find("td:nth-child(5)").text());
    $("#view-status").text(row.find("td:nth-child(6)").text());

    showViewVehiclePopup();
  });

  $("#closeButton").on("click", function () {
    closeViewVehiclePopup();
  });
});
