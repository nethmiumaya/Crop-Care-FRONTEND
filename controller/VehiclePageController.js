import VehicleModel from "../model/VehicleModel.js";
import StaffModel from "../model/StaffPageModel.js";
$(document).ready(function () {
  function showAddVehiclePopup() {
    $(".add-vehicle-popup").fadeIn();
  }

  function closeAddVehiclePopUp() {
    $(".add-vehicle-popup").fadeOut();
  }
  // Show add vehicle popup
  $(".add-vehicle-button").on("click", function () {
    showAddVehiclePopup();
  });

  function showUpdateVehiclePopup() {
    $(".update-vehicle-popup").fadeIn();
  }

  // Fetch and display staff data
  function loadVehicleData(allVehicleData) {
    const vehicleTableBody = $(".vehicle-table tbody");
    vehicleTableBody.empty(); // Clear existing rows

    allVehicleData.forEach((vehicle) => {
      console.log(vehicle); // Log the vehicle object to verify its structure
      const row = `
        <tr class="table-row" data-vehicle='${JSON.stringify(vehicle)}'>
          <td>${vehicle.licensePlateNo}</td>
          <td>${vehicle.remarks}</td>
          <td>${vehicle.vehicleCategory}</td>
          <td>${vehicle.status}</td>
          <td>
            <button class="action-button delete" data-id="${
              vehicle.vehicleCode
            }">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button view" data-id="${vehicle.vehicleCode}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-button edit" data-id="${vehicle.vehicleCode}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
      vehicleTableBody.append(row);
    });
    attachEventHandlers();
  }
  // Load staff data on page load

  async function loadVehicleDataToTable() {
    try {
      const allVehicleData = await getAllVehicleData();
      loadVehicleData(allVehicleData);
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    }
  }

  loadVehicleDataToTable();

  // Handle form submission for adding a new staff
  $("#vehicleSaveBtn").on("click", async function (e) {
    e.preventDefault();

    const newVehicle = {
      licensePlateNo: $("#licensePlate").val(),
      vehicleCategory: $("#category").val(),
      fuelType: $("#fuelType").val(),
      status: $("#status").val(),
      remarks: $("#remarks").val(),
      staffId: $("#staff").val(),
    };
    console.log("New Vehicle Data:", newVehicle);
    await addVehicleMember(newVehicle);
    alert("Vehicle added successfully");
    console.log("Vehicle added successfully");
    window.location.reload();
    closeAddVehiclePopUp();
    // Reload the staff data
  });

  // Handle form submission for updating a vehicle
  $("#updateVehicleBtn").on("click", async function (e) {
    e.preventDefault();
    const vehicleCode = $(this).data("id"); // Ensure the id is retrieved correctly
    const updatedVehicle = {
      licensePlateNo: $("#updateLicensePlate").val(),
      vehicleCategory: $("#updateCategory").val(),
      fuelType: $("#updateFuelType").val(),
      status: $("#updateStatus").val(),
      remarks: $("#updateRemarks").val(),
      staffId: $("#updateStaff").val(),
    };

    await updateVehicleMember(vehicleCode, updatedVehicle); // Pass the id to the function
    window.location.reload();
    closeUpdateVehiclePopup();
  });
  // Fetch and populate staff data in the combo box
  async function loadStaffData() {
    try {
      const allStaffData = await StaffModel.getAllStaff();
      const staffSelect = $("#staff");
      allStaffData.forEach((staff) => {
        const option = `<option value="${staff.id}">${staff.firstName} ${staff.lastName}</option>`;
        staffSelect.append(option);
      });
    } catch (error) {
      console.error("Error loading staff data:", error);
    }
  }

  // Fetch and populate staff data in the combo box
  async function loadStaffData() {
    try {
      const allStaffData = await StaffModel.getAllStaff();
      const staffSelect = $("#updateStaff");
      allStaffData.forEach((staff) => {
        const option = `<option value="${staff.id}">${staff.firstName} ${staff.lastName}</option>`;
        staffSelect.append(option);
      });
    } catch (error) {
      console.error("Error loading staff data:", error);
    }
  }
  loadStaffData();
  function attachEventHandlers() {
    //View Vehicle Details
    $(".action-button.view").on("click", function () {
      const vehicleData = $(this).closest(".table-row").data("vehicle");
      console.log(vehicleData);

      $("#viewlicensePlateNo").text(vehicleData.licensePlateNo);
      $("#viewFuelType").text(vehicleData.fuelType);
      $("#viewRemarks").text(vehicleData.remarks);
      $("#vewCategory").text(vehicleData.vehicleCategory); // Update property name if needed
      $("#viewStatus").text(vehicleData.status);
      $("#viewStaff").text(vehicleData.staff); // Update property name if needed
      $(".view-vehicle-popup").fadeIn();
    });
    // Edit vehicle details
    $(".action-button.edit").on("click", function (e) {
      const vehicleCode = $(this).data("id");
      VehicleModel.getVehicleById(vehicleCode)
        .done(function (response) {
          $("#updateLicensePlate").val(response.licensePlateNo);
          $("#updateFuelType").val(response.fuelType);
          $("#updateRemarks").val(response.remarks);
          $("#updateCategory").val(response.vehicleCategory);
          $("#updateStatus").val(response.status);
          $("#updateStaff").val(response.staffId); // Ensure this matches the staff select element
          $("#updateVehicleBtn").data("id", vehicleCode); // Set the id on the update button
          showUpdateVehiclePopup();
        })
        .fail(function () {
          alert("Error fetching vehicle details");
        });
    });
    // Delete vehicle
    $(".action-button.delete").on("click", function () {
      const vehicleCode = $(this).data("id");
      if (confirm("Are you sure you want to delete this vehicle ?")) {
        VehicleModel.deleteVehicle(vehicleCode)
          .done(function () {
            alert("vehicle deleted successfully");
            loadVehicleDataToTable(); // Reload the staff data
          })
          .fail(function () {
            alert("Error deleting vehicle");
          });
      }
    });
  }
});

const getAllVehicleData = async () => {
  try {
    const response = await VehicleModel.getAllVehicle();
    return response;
  } catch (error) {
    console.error("Error loading vehicle data:", error);
    throw new Error("Failed to load vehicle data");
  }
};

const addVehicleMember = async (vehicleDTO) => {
  console.log(" vehicle dto : ", vehicleDTO);
  VehicleModel.postVehicle(vehicleDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 201) {
        console.log("response", response);
        alert("Failed to add vehicle");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during vehicle addition:", error);
      alert("Failed to add vehicle");
      throw new Error("Failed to add vehicle");
    });
};
const updateVehicleMember = async (id, vehicleDTO) => {
  console.log("Update Vehicle:", vehicleDTO);
  VehicleModel.updateVehicle(id, vehicleDTO)
    .done((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 200) {
        alert("Failed to update vehicle");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during vehicle update:", error);
      alert("Failed to update vehicle");
      throw new Error("Failed to update vehicle");
    });
};
