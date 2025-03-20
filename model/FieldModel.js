import { getJwtToken } from "../utility/Utilities.js";

const FieldModel = {
  getAllField: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/field/all",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during Field  retrieval:", error);
        throw new Error("Failed to retrieve Field");
      },
    });
  },

  getFieldById: function (fieldCode) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/field/${fieldCode}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        console.log("response", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching field details:", error);
        throw new Error("Failed to fetch field details");
      },
    });
  },
  //post field
  postField: function (formData) {
    console.log("Post Field:", formData);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/field",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: false, // Important for file upload
      processData: false, // Important for file upload
      data: formData,
      success: function (response) {
        console.log("Field added successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during field addition:", error);
        throw new Error("Failed to add field");
      },
    });
  },
  //update field
  updateField: function (fieldCode, formData) {
    console.log("Update Field:", formData);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/field/${fieldCode}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: false, // Important for file upload
      processData: false, // Important for file upload
      data: formData,
      success: function (response) {
        console.log("Field updated successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during field update:", error);
        throw new Error("Failed to update field");
      },
    });
  },
  //delete field
  deleteField: function (staffId) {
    return $.ajax({
      type: "DELETE",
      url: `http://localhost:5050/main/api/v1/field/${staffId}`,
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

export default FieldModel;
