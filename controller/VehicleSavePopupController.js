$(document).ready(function () {
  function closeAddVehiclePopup() {
    $(".add-vehicle-popup").fadeOut();
  }
  function showAddVehiclePopup() {
    $(".update-vehicle-popup").fadeIn();
  }

  $(".back-btn").on("click", function () {
    closeAddVehiclePopup();
  });
  $(".edit").on("click", function () {
    showAddVehiclePopup();
  });

  // Handle form submission for adding a vehicle
  $(".add-vehicle-popup form").on("submit", function (e) {
    e.preventDefault();

    const vehicleData = {
      licensePlate: $("#licensePlate").val(),
      fuelType: $("#fuelType").val(),
      remarks: $("#remarks").val(),
      category: $("#category").val(),
      status: $("#status").val(),
      staff: $("#staff").val(),
    };

    $.ajax({
      url: "http://localhost:5050/main/api/v1/vehicles",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(vehicleData),
      success: function (response) {
        alert("Vehicle added successfully!");
        $(".add-vehicle-popup").fadeOut();
        // Optionally, refresh the vehicle list or update the UI
      },
      error: function (error) {
        alert("Error adding vehicle: " + error.responseText);
      },
    });
  });
});
