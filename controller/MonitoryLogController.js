import LogModel from "../model/MonitoryLogModel.js";
import FieldModel from "../model/FieldModel.js"; // Assuming you have a StaffPageModel.js to fetch staff data

$(document).ready(function () {
  function showAddMonitoryLogPopup() {
    $(".add-log-popup").fadeIn();
  }

  function closeAddMonitoryLogPopup() {
    $(".add-log-popup").fadeOut();
  }

  $(".add-log-button").on("click", function () {
    showAddMonitoryLogPopup();
  });
  function showUpdateMonitoryLogPopup() {
    $(".update-log-popup").fadeIn();
  }

  // Fetch and display log data
  function loadLogData(allLogData) {
    const logTableBody = $(".log-table tbody");
    logTableBody.empty(); // Clear existing rows

    allLogData.forEach((log) => {
      console.log(log); // Log the log object to verify its structure
      const row = `
        <tr class="table-row" data-log='${JSON.stringify(log)}'>
          <td>${log.logDate}</td>
          <td>${log.observation}</td>
          <td><img src="data:image/jpeg;base64,${
            log.observedImage
          }" alt="Observed Image" style="width: 100px; height: auto;" /></td>
          <td>
            <button class="action-button delete" data-id="${log.logCode}">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button view" data-id="${log.logCode}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-button edit" data-id="${log.logCode}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
      logTableBody.append(row);
    });
    attachEventHandlers();
  }

  // Load log data on page load
  async function loadLogDataToTable() {
    try {
      const allLogData = await getAllLogData();
      loadLogData(allLogData);
    } catch (error) {
      console.error("Error loading log data:", error);
    }
  }

  loadLogDataToTable();

  // Fetch and populate staff data in the combo box
  async function loadFieldData() {
    try {
      const allFieldData = await FieldModel.getAllField();
      const fieldSelect = $("#field");
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
      const fieldSelect = $("#field");
      allFieldData.forEach((field) => {
        const option = `<option value="${field.fieldCode}">${field.fieldName}</option>`;
        fieldSelect.append(option);
      });
    } catch (error) {
      console.error("Error loading field data:", error);
    }
  }
  loadFieldData();
  async function updateloadFieldData() {
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

  updateloadFieldData();

  // Handle form submission for adding a new monitory log
  $("#monitoryLogSaveBtn").on("click", async function (e) {
    e.preventDefault();
    const newLog = {
      logDate: $("#log-date").val(),
      observation: $("#observation").val(),
      fieldId: $("#field").val(),
      observedImage: $("#log-image-01")[0].files[0], // Get the selected file
    };

    console.log("New Log Data:", newLog); // Log the data being sent

    try {
      const formData = new FormData();
      formData.append("logDate", newLog.logDate);
      formData.append("observation", newLog.observation);
      formData.append("fieldId", newLog.fieldId);
      formData.append("observedImage", newLog.observedImage);

      const response = await LogModel.postMonitoryLog(formData);
      console.log("Log added successfully:", response);
      alert("Log added successfully");
      window.location.reload();
      closeAddMonitoryLogPopup();
    } catch (error) {
      alert("Failed to add log");
      console.error("Error during log addition:", error);
    }
  });

  // Handle form submission for updating a monitory log
  $("#updateMonitoryLogBtn").on("click", async function (e) {
    e.preventDefault();
    const logCode = $(this).data("id"); // Ensure the id is retrieved correctly
    const updatedLog = {
      logDate: $("#updateLogDate").val(),
      observation: $("#updateObservation").val(),
      fieldId: $("#updateFieldId").val(),
      observedImage: $("#updateLogImage")[0].files[0], // Get the selected file
    };

    console.log("Updated Log Data:", updatedLog); // Log the data being sent

    try {
      const formData = new FormData();
      formData.append("logDate", updatedLog.logDate);
      formData.append("observation", updatedLog.observation);
      formData.append("fieldId", updatedLog.fieldId);
      formData.append("observedImage", updatedLog.observedImage);
      console.log(updatedLog.observedImage);

      const response = await LogModel.updateLog(logCode, formData);
      console.log("Log updated successfully:", response);
      alert("Log updated successfully");
      window.location.reload();
      closeUpdateMonitoryLogPopup();
    } catch (error) {
      alert("Failed to update log");
      console.error("Error during log update:", error);
    }
  });

  function attachEventHandlers() {
    // View log details
    $(".action-button.view").on("click", function () {
      const logData = $(this).closest(".table-row").data("log");

      $("#viewDate").text(logData.logDate);
      $("#viewObservation").text(logData.observation);
      $("#viewStaff").text(logData.staff);
      $("#view-log-image").attr(
        "src",
        `data:image/jpeg;base64,${logData.observedImage}`
      );
      $(".view-log-popup").fadeIn();
    });

    // Edit log details
    $(".action-button.edit").on("click", function (e) {
      const logCode = $(this).data("id");
      LogModel.getLogById(logCode)
        .done(function (response) {
          $("#update-log-date").val(response.logDate);
          $("#updateObservation").val(response.observation);
          $("#updateFieldId").val(response.fieldId);
          $("#updateMonitoryLogBtn").data("id", logCode); // Set the id on the update button
          showUpdateMonitoryLogPopup();
        })
        .fail(function () {
          alert("Error fetching log details");
        });
    });

    // Delete log entry
    $(".action-button.delete").on("click", function () {
      const logCode = $(this).data("id");
      console.log("Log Code:", logCode); // Log the log code to verify it
      if (confirm("Are you sure you want to delete this log entry?")) {
        LogModel.deleteLog(logCode)
          .done(function () {
            alert("Log entry deleted successfully");
            loadLogDataToTable(); // Reload the log data
          })
          .fail(function () {
            alert("Error deleting log entry");
          });
      }
    });
  }
});

const getAllLogData = async () => {
  try {
    const response = await LogModel.getAllLog();
    return response;
  } catch (error) {
    console.error("Error loading log data:", error);
    throw new Error("Failed to load log data");
  }
};
