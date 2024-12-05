import CropModel from "../model/CropModel.js";
import FieldModel from "../model/FieldModel.js";
$(document).ready(function () {
  function showAddCropPopup() {
    $(".add-crop-popup").fadeIn();
  }

  // Show add crop popup
  $(".add-crop-button").on("click", function () {
    showAddCropPopup();
  });

  function showUpdateCropPopup() {
    $(".update-crop-popup").fadeIn();
  }
  function closeUpdateCropPopup() {
    $(".update-crop-popup").fadeOut();
  }
  // Fetch and display staff data
  function loadCropData(allCropData) {
    const CropTableBody = $(".crop-table tbody");
    CropTableBody.empty(); // Clear existing rows

    allCropData.forEach((crop) => {
      console.log(crop); // Log the vehicle object to verify its structure
      const row = `
        <tr class="table-row" data-crop='${JSON.stringify(crop)}'>
          <td>${crop.commonName}</td>
          <td>${crop.scientificName}</td>
          <td>${crop.category}</td>
          <td>${crop.season}</td>
          <td><img src="data:image/jpeg;base64,${
            crop.cropImage
          }" alt="Field Image" style="width: 100px; height: auto;" /></td>
        
          <td>
            <button class="action-button delete" data-id="${crop.code}">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button view" data-id="${crop.code}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-button edit" data-id="${crop.code}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
      CropTableBody.append(row);
    });
    attachEventHandlers();
  }

  // Fetch and populate staff data in the combo box
  async function loadFieldData() {
    try {
      const allFieldData = await FieldModel.getAllField();
      const fieldSelect = $("#fieldId");
      allFieldData.forEach((field) => {
        const option = `<option value="${field.fieldCode}">${field.fieldName}</option>`;
        fieldSelect.append(option);
      });
    } catch (error) {
      console.error("Error loading field data:", error);
    }
  }

  // Fetch and populate staff data in the combo box
  async function loadFieldData() {
    try {
      const allFieldData = await FieldModel.getAllField();
      const fieldSelect = $("#updateFieldId");
      allFieldData.forEach((field) => {
        const option = `<option value="${field.fieldCode}">${field.fieldName}</option>`;
        fieldSelect.append(option);
      });
    } catch (error) {
      console.error("Error loading field data:", error);
    }
  }

  loadFieldData();

  //save crop
  $("#cropSaveBtn").on("click", async function (e) {
    e.preventDefault();
    const newCrop = {
      commonName: $("#common-name").val(),
      scientificName: $("#scientific-name").val(),
      category: $("#category").val(),
      season: $("#season").val(),
      fieldId: $("#fieldId").val(),
      cropImage: $("#crop-image")[0].files[0], // Get the selected file
    };

    console.log("New Crop Data:", newCrop); // Log the data being sent

    try {
      const formData = new FormData();
      formData.append("commonName", newCrop.commonName);
      formData.append("scientificName", newCrop.scientificName);
      formData.append("category", newCrop.category);
      formData.append("season", newCrop.season);
      formData.append("fieldId", newCrop.staffId);
      formData.append("cropImage", newCrop.cropImage);

      const response = await CropModel.postCrop(formData);
      console.log("Crop added successfully:", response);
      alert("Crop added successfully");
      window.location.reload();
      closeAddCropPopup();
    } catch (error) {
      console.error("Error during crop addition:", error);
    }
  });

  // Handle form submission for updating a crop
  $("#updateCropBtn").on("click", async function (e) {
    e.preventDefault();
    const cropCode = $(this).data("id"); // Ensure the id is retrieved correctly
    const updatedCrop = {
      commonName: $("#updateCommonName").val(),
      scientificName: $("#updateScientificName").val(),
      category: $("#updateCategory").val(),
      season: $("#updateSeason").val(),
      fieldId: $("#updateFieldId").val(),
      cropImage: $("#updateCropImage")[0].files[0], // Get the selected file
    };

    console.log("Updated Crop Data:", updatedCrop); // Log the data being sent

    try {
      const formData = new FormData();
      formData.append("commonName", updatedCrop.commonName);
      formData.append("scientificName", updatedCrop.scientificName);
      formData.append("category", updatedCrop.category);
      formData.append("season", updatedCrop.season);
      formData.append("fieldId", updatedCrop.fieldId);
      formData.append("cropImage", updatedCrop.cropImage);

      const response = await CropModel.updateCrop(cropCode, formData);
      console.log("Crop updated successfully:", response);
      alert("Crop updated successfully");
      window.location.reload();
      closeUpdateCropPopup();
    } catch (error) {
      console.error("Error during crop update:", error);
    }
  });

  function attachEventHandlers() {
    // View crop details
    $(".action-button.view").on("click", function () {
      const cropData = $(this).closest(".table-row").data("crop");

      $("#viewcommonName").text(cropData.commonName);
      $("#viewScientificName").text(cropData.scientificName);
      $("#viewCategory").text(cropData.category);
      $("#viewSeason").text(cropData.season);
      $("#viewField").text(cropData.field);
      $("#view-crop-image").attr(
        "src",
        `data:image/jpeg;base64,${cropData.cropImage}`
      );
      $(".view-crop-popup").fadeIn();
    });
    // Edit crop details
    $(".action-button.edit").on("click", function (e) {
      const cropCode = $(this).data("id");
      CropModel.getCropById(cropCode)
        .done(function (response) {
          $("#updateCommonName").val(response.commonName);
          $("#updateScientificName").val(response.scientificName);
          $("#updateCategory").val(response.category);
          $("#updateSeason").val(response.season);
          $("#updateFieldId").val(response.fieldId);
          $("#updateCropBtn").data("id", cropCode); // Set the id on the update button
          showUpdateCropPopup();
        })
        .fail(function () {
          alert("Error fetching crop details");
        });
    });
    // Delete crop
    $(".action-button.delete").on("click", function () {
      const code = $(this).data("id");
      console.log("crop code : ", code);
      if (confirm("Are you sure you want to delete this crop ?")) {
        CropModel.deleteCrop(code)
          .done(function () {
            alert("Crop deleted successfully");
            loadCropDataToTable(); // Reload the staff data
          })
          .fail(function () {
            alert("Error deleting crop");
          });
      }
    });
  }

  async function loadCropDataToTable() {
    try {
      const allCropData = await getAllCropData();
      loadCropData(allCropData);
    } catch (error) {
      console.error("Error loading Crop data:", error);
    }
  }
  loadCropDataToTable();
});
const getAllCropData = async () => {
  try {
    const response = await CropModel.getAllCrops();
    return response;
  } catch (error) {
    console.error("Error loading crop data:", error);
    throw new Error("Failed to load crop data");
  }
};
