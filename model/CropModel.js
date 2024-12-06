import { getJwtToken } from "../utility/Utilities.js";

const CropModel = {
  getAllCrops: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/crop/all",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop  retrieval:", error);
        throw new Error("Failed to retrieve crop");
      },
    });
  },

  getCropById: function (cropCode) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/crop/${cropCode}`,
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

  postCrop: function (formData) {
    console.log("Post Crop:", formData);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/crop",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: false, // Important for file upload
      processData: false, // Important for file upload
      data: formData,
      success: function (response) {
        console.log("Crop added successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop addition:", error);
        throw new Error("Failed to add crop");
      },
    });
  },
  //update crop
  updateCrop: function (code, formData) {
    console.log("Update Crop:", formData);
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/crop/${code}`,
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
  //delete crop
  deleteCrop: function (code) {
    return $.ajax({
      type: "DELETE",
      url: `http://localhost:5050/main/api/v1/crop/${code}`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function () {
        return "Crop deleted successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error deleting Crop:", error);
        throw new Error("Failed to delete Crop");
      },
    });
  },
  //update crop field
  updateCropField: function (cropId, fieldId) {
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/crop`,
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      data: {
        cropId: cropId,
        fieldId: fieldId,
      },
      success: function (response) {
        console.log("Crop field updated successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop field update:", error);
        throw new Error("Failed to update crop field");
      },
    });
  },
  //update crop field
  updateCropField: function (cropId, fieldId) {
    const token = getJwtToken();
    console.log("JWT Token:", token); // Log the JWT token
    return $.ajax({
      type: "PUT",
      url: `http://localhost:5050/main/api/v1/crop`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        cropId: cropId,
        fieldId: fieldId,
      },
      success: function (response) {
        console.log("Crop field updated successfully:", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop field update:", error);
        console.error("Response status:", xhr.status); // Log the response status
        console.error("Response text:", xhr.responseText); // Log the response text
        throw new Error("Failed to update crop field");
      },
    });
  },
};

export default CropModel;
