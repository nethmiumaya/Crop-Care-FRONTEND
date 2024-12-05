import { getJwtToken } from "../utility/Utilities.js";

const LogModel = {
  getAllLog: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/monitoryLog/all",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during Monitory Log retrieval:", error);
        throw new Error("Failed to retrieve monitory log");
      },
    });
  },

  getLogById: function (logCode) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/monitoryLog/${logCode}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        console.log("response", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching log details:", error);
        throw new Error("Failed to fetch log details");
      },
    });
  },

  postMonitoryLog: function (formData) {
    console.log("Post Log:", formData);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/monitoryLog",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: false, // Important for file upload
      processData: false, // Important for file upload
      data: formData,
      success: function (response) {
        console.log("Monitory Log added successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during monitory log addition:", error);
        throw new Error("Failed to add monitory log");
      },
    });
  },

  //update log
  updateLog: function (logCode, formData) {
    console.log("Update Log:", formData);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/monitoryLog/${logCode}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: false, // Important for file upload
      processData: false, // Important for file upload
      data: formData,
      success: function (response) {
        console.log("Crop updated successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop update:", error);
        throw new Error("Failed to update crop");
      },
    });
  },

  deleteLog: function (logCode) {
    return $.ajax({
      type: "DELETE",
      url: `http://localhost:5050/main/api/v1/monitoryLog/${logCode}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function () {
        return "Log entry deleted successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error deleting log entry:", error);
        throw new Error("Failed to delete log entry");
      },
    });
  },
};

export default LogModel;
