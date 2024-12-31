import FieldModel from "../model/FieldModel.js";
$(document).ready(function () {
  function showAddFieldPopup() {
    $(".add-field-popup").fadeIn();
  }

  // Show add field popup
  $(".add-field-button").on("click", function () {
    showAddFieldPopup();
  });
  function showUpdateFieldPopup() {
    $(".update-field-popup").fadeIn();
  }
  // $("#closeUpdateFieldPopup").on("click", function () {
  //   closeUpdateFieldPopup();
  // });
  // Fetch and display staff data
  function loadFieldData(allFieldData) {
    const FieldTableBody = $(".field-table tbody");
    FieldTableBody.empty(); // Clear existing rows

    allFieldData.forEach((field) => {
      console.log(field); // Log the vehicle object to verify its structure
      const row = `
        <tr  class="table-row" data-field='${JSON.stringify(field)}'>
          <td>${field.fieldName}</td>
          <td>${field.fieldLocation}</td>
          <td>${field.extentSize}</td>
          <td><img src="data:image/jpeg;base64,${
            field.fieldImage1
          }" alt="Field Image" style="width: 100px; height: auto;" /></td>
         <td><img src="data:image/jpeg;base64,${
           field.fieldImage2
         }" alt="Field Image" style="width: 100px; height: auto;" /></td>
          <td>
            <button class="action-button delete" data-id="${field.fieldCode}">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button view" data-id="${field.fieldCode}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-button edit" data-id="${field.fieldCode}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
      FieldTableBody.append(row);
    });
    attachEventHandlers();
  }

  // Handle form submission for adding a new field
  $("#fieldSaveBtn").on("click", async function (e) {
    e.preventDefault();
    const newField = {
      fieldName: $("#field-name").val(),
      fieldLocation: $("#field-location").val(),
      extentSize: $("#extent-size").val(),
      fieldImage1: $("#field-image-01")[0].files[0], // Get the selected file
      fieldImage2: $("#field-image-02")[0].files[0], // Get the selected file
    };

    console.log("New Field Data:", newField); // Log the data being sent

    try {
      const formData = new FormData();
      formData.append("fieldName", newField.fieldName);
      formData.append("fieldLocation", newField.fieldLocation);
      formData.append("extentSize", newField.extentSize);
      formData.append("fieldImage1", newField.fieldImage1);
      formData.append("fieldImage2", newField.fieldImage2);

      const response = await FieldModel.postField(formData);
      console.log("Field added successfully:", response);
      alert("Field added successfully");
      window.location.reload();
      closeAddFieldPopup();
    } catch (error) {
      alert("Failed to add field");
      console.error("Error during field addition:", error);
    }
  });

  // Handle form submission for updating a field
  $("#updateFieldBtn").on("click", async function (e) {
    e.preventDefault();
    const fieldCode = $(this).data("id"); // Ensure the id is retrieved correctly
    const updatedField = {
      fieldName: $("#updateFieldName").val(),
      fieldLocation: $("#updateFieldLocation").val(),
      extentSize: $("#updateExtentSize").val(),
      fieldImage1: $("#updateFieldImage1")[0].files[0], // Get the selected file
      fieldImage2: $("#updateFieldImage2")[0].files[0], // Get the selected file
    };

    console.log("Updated Field Data:", updatedField); // Log the data being sent

    try {
      const formData = new FormData();
      formData.append("fieldName", updatedField.fieldName);
      formData.append("fieldLocation", updatedField.fieldLocation);
      formData.append("extentSize", updatedField.extentSize);
      formData.append("fieldImage1", updatedField.fieldImage1);
      formData.append("fieldImage2", updatedField.fieldImage2);

      const response = await FieldModel.updateField(fieldCode, formData);
      console.log("Field updated successfully:", response);
      alert("Field updated successfully");
      window.location.reload();
      closeUpdateFieldPopup();
    } catch (error) {
      alert("Failed to update field");
      console.error("Error during field update:", error);
    }
  });

  // filepath: /c:/Users/Umaya/Documents/Crop-Care-FRONTEND/controller/FieldController.js
  // ...existing code...

  // Function to initialize the map
  function initMap(lat, lng) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: lat, lng: lng },
      zoom: 13,
    });

    new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      title: "Field Location",
    });
  }

  // ...existing code...

  function attachEventHandlers() {
    // View field details
    $(".action-button.view").on("click", function () {
      const fieldData = $(this).closest(".table-row").data("field");

      $("#viewFieldName").text(fieldData.fieldName);
      $("#viewFieldLocation").text(fieldData.fieldLocation);
      $("#viewExtendSize").text(fieldData.extentSize);
      $("#view-field-image1").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.fieldImage1}`
      );
      $("#view-field-image2").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.fieldImage2}`
      );

      // Extract latitude and longitude from fieldLocation and initialize the map
      const [lat, lng] = fieldData.fieldLocation.split(",").map(Number);
      initMap(lat, lng);

      $(".view-field-popup").fadeIn();
    });
    // Edit field details
    $(".action-button.edit").on("click", function (e) {
      const fieldCode = $(this).data("id");
      FieldModel.getFieldById(fieldCode)
        .done(function (response) {
          $("#updateFieldName").val(response.fieldName);
          $("#updateFieldLocation").val(response.fieldLocation);
          $("#updateExtentSize").val(response.extentSize);
          $("#updateFieldBtn").data("id", fieldCode); // Set the id on the update button
          showUpdateFieldPopup();
        })
        .fail(function () {
          alert("Error fetching field details");
        });
    });

    // Delete field
    $(".action-button.delete").on("click", function () {
      const fieldCode = $(this).data("id");
      if (confirm("Are you sure you want to delete this field member?")) {
        FieldModel.deleteField(fieldCode)
          .done(function () {
            alert("field deleted successfully");
            loadFieldDataToTable(); // Reload the staff data
          })
          .fail(function () {
            alert("Error deleting field");
          });
      }
    });
  }
  // Load field data on page load

  async function loadFieldDataToTable() {
    try {
      const allFieldData = await getAllFieldData();
      loadFieldData(allFieldData);
    } catch (error) {
      console.error("Error loading Field data:", error);
    }
  }
  loadFieldDataToTable();
});
const getAllFieldData = async () => {
  try {
    const response = await FieldModel.getAllField();
    return response;
  } catch (error) {
    console.error("Error loading field data:", error);
    throw new Error("Failed to load field data");
  }
};
