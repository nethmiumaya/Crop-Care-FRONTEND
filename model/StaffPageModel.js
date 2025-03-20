import { getJwtToken } from "../utility/Utilities.js";
const jwtToken = getJwtToken();
if (jwtToken) {
  $.ajaxSetup({
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}
const StaffModel = {
  getAllStaff: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/staff/all",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff retrieval:", error);
        throw new Error("Failed to retrieve staff");
      },
    });
  },
  //save staff
  postStaff: function (newStaff) {
    console.log(" Post Staff : ", newStaff);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/staff",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(newStaff),
    });
  },
  //update staff
  updateStaff: function (id, updatedStaff) {
    console.log("Update Staff:", updatedStaff);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/staff/${id}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(updatedStaff), // Corrected this line
    });
  },
  getStaffById: function (staffId) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/staff/${staffId}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching staff details:", error);
        throw new Error("Failed to fetch staff details");
      },
    });
  },
  //delete staff
  deleteStaff: function (staffId) {
    return $.ajax({
      type: "DELETE",
      url: `http://localhost:5050/main/api/v1/staff/${staffId}`,
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
};

export default StaffModel;
