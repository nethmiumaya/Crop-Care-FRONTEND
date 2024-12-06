import { getJwtToken } from "../utility/Utilities.js";
const jwtToken = getJwtToken();
if (jwtToken) {
  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}
const VehicleModel = {
  getAllVehicle: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/vehicles/allvehicles",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff retrieval:", error);
        throw new Error("Failed to retrieve vehicle");
      },
    });
  },
  postVehicle: function (newStaff) {
    console.log(" Post Vehicle : ", newStaff);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/vehicles",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(newStaff),
    });
  },

  updateVehicle: function (id, updatedVehicle) {
    console.log("Update Vehicle:", updatedVehicle);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/vehicles/${id}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(updatedVehicle),
    });
  },

  getVehicleById: function (vehicleCode) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/vehicles/${vehicleCode}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        console.log("response", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching vehicles details:", error);
        throw new Error("Failed to fetch vehicles details");
      },
    });
  },

  //delete vehicle
  deleteVehicle: function (vehicleCode) {
    return $.ajax({
      type: "DELETE",
      url: `http://localhost:5050/main/api/v1/vehicles/${vehicleCode}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function () {
        return "Staff deleted successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error deleting staff:", error);
        throw new Error("Failed to delete staff");
      },
    });
  },


  // update Vehicle Staff.

  updateVehicleDriver: function (vehicleCode, driverId) {
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/vehicles`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      data: {
        vehicleCode: vehicleCode,
        driverId: driverId,
      },
      success: function () {
        return "Vehicle driver updated successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error updating vehicle driver:", error);
        throw new Error("Failed to update vehicle driver");
      },
    });
  },
};

export default VehicleModel;
