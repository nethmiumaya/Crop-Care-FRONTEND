$(document).ready(function () {
  function showViewEquipmentPopup() {
    $(".view-equipment-popup").fadeIn();
  }

  function closeViewEquipmentPopup() {
    $(".view-equipment-popup").fadeOut();
  }

  $(".action-button.view").on("click", function () {
    // Populate the popup with equipment details
    const row = $(this).closest("tr");
    $("#view-equipment-name").text(row.find("td:nth-child(1)").text());
    $("#view-type").text(row.find("td:nth-child(2)").text());
    $("#view-status").text(row.find("td:nth-child(3)").text());

    showViewEquipmentPopup();
  });

  $(".close-button").on("click", function () {
    closeViewEquipmentPopup();
  });
});
