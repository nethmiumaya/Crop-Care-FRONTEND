import { getJwtToken } from "../utility/Utilities.js";
const jwtToken = getJwtToken();
if (jwtToken) {
  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}
const EquipmentModel = {
  getAllEquipment: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/equipment/allequipments",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during equipment retrieval:", error);
        throw new Error("Failed to retrieve equipment");
      },
    });
  },

  postEquipment: function (newEquipment) {
    console.log(" Post Equipment : ", newEquipment);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/equipment",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(newEquipment),
    });
  },
  //update equipment
  updateEquipment: function (equipmentCode, updatedEquipment) {
    console.log("Update Equipment:", updatedEquipment);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/equipment/${equipmentCode}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(updatedEquipment),
    });
  },
  getEquipmentById: function (equipmentCode) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/equipment/${equipmentCode}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        console.log("response", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching equipment details:", error);
        throw new Error("Failed to fetch equipment details");
      },
    });
  },
  //delete staff
  deleteEquipment: function (equipmentId) {
    return $.ajax({
      type: "DELETE",
      url: `http://localhost:5050/main/api/v1/equipment/${equipmentId}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function () {
        return "equipment deleted successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error deleting equipment:", error);
        throw new Error("Failed to delete equipment");
      },
    });
  },
};

export default EquipmentModel;
