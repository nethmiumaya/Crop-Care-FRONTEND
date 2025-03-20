$(document).ready(function () {
  function showViewFieldPopup() {
    $(".view-field-popup").fadeIn();
  }

  function closeViewFieldPopup() {
    $(".view-field-popup").fadeOut();
  }

  $(".action-button.view").on("click", function () {
    // Populate the popup with crop details
    const row = $(this).closest("tr");
    $("#view-crop-name").text(row.find("td:nth-child(1)").text());
    $("#view-category").text(row.find("td:nth-child(2)").text());
    $("#view-season").text(row.find("td:nth-child(3)").text());
    $("#view-staff").text(row.find("td:nth-child(4)").text());
    $("#view-crop-image").attr(
      "src",
      row.find("td:nth-child(5) img").attr("src")
    );

    showViewFieldPopup();
  });

  $(".close-button").on("click", function () {
    closeViewFieldPopup();
  });
});
