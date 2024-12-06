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

  updateEquipmentStaff: function (equipmentCode, staffId) {
    console.log("Update Equipment Staff:", equipmentCode, staffId);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/equipment/updateStaff`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      data: {
        equipmentCode: equipmentCode,
        staffId: staffId,
      },
      success: function (response) {
        console.log("Equipment staff updated successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during equipment staff update:", error);
        throw new Error("Failed to update equipment staff");
      },
    });
  },

  updateFieldEquipment: function (equipmentCode, fieldCode) {
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/equipment/updateStaff`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      data: {
        equipmentCode: equipmentCode,
        fieldCode: fieldCode,
      },
      success: function () {
        return "Equipment field updated successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error updating equipment field:", error);
        throw new Error("Failed to update equipment field");
      },
    });
  },

  updateMonitoryLogCrops: function (logCode, crops) {
    console.log("Update Monitory Log Crops:", logCode, crops);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/monitoryLog/${logCode}/crops`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(crops),
      success: function (response) {
        console.log("Monitory log crops updated successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during monitory log crops update:", error);
        throw new Error("Failed to update monitory log crops");
      },
    });
  },
};

export default EquipmentModel;
