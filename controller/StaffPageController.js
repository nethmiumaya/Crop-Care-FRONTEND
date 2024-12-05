import StaffModel from "../model/StaffPageModel.js";
$(document).ready(function () {
  function showAddStaffPopup() {
    $(".add-staff-popup").fadeIn();
  }

  function closeAddStaffPopup() {
    $(".add-staff-popup").fadeOut();
  }

  function showUpdateStaffPopup() {
    $(".update-staff-popup").fadeIn();
  }

  function closeUpdateStaffPopup() {
    $(".update-staff-popup").fadeOut();
  }

  // Show add staff popup
  $(".add-staff-button").on("click", function () {
    showAddStaffPopup();
  });

  // Fetch and display staff data
  function loadStaffData(allStaffData) {
    const staffTableBody = $(".staff-table tbody");
    staffTableBody.empty(); // Clear existing rows

    allStaffData.forEach((staff) => {
      const row = `
            <tr>
              <td>${staff.firstName} ${staff.lastName}</td>
              <td>${staff.designation}</td>
              <td>${staff.email}</td>
              <td>${staff.gender}</td>
              <td>
                <button class="action-button delete" data-id="${staff.id}">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button class="action-button view" data-id="${staff.id}">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-button edit" data-id="${staff.id}">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          `;
      staffTableBody.append(row);
    });

    // Attach event handlers for delete, view, and edit buttons
    attachEventHandlers();
  }

  // Load staff data on page load

  async function loadStaffDatatoTable() {
    try {
      const allStaffData = await getAllStaffData();
      loadStaffData(allStaffData);
    } catch (error) {
      console.error("Error loading staff data:", error);
    }
  }

  loadStaffDatatoTable();

  // Handle form submission for adding a new staff
  $("#staffSaveBtn").on("click", async function (e) {
    e.preventDefault();
    const newStaff = {
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      designation: $("#designation").val(),
      gender: $("#gender").val(),
      conNo: $("#contact-no").val(),
      email: $("#email").val(),
      addLine01: $("#address").val(),
      DOB: formatDate($("#dob").val()), // Format the date
      joinDate: formatDate($("#join-date").val()),
      role: $("#role").val(),
    };

    await addStaffMember(newStaff);
    window.location.reload();
    closeAddStaffPopup();
    // Reload the staff data
  });

  // Handle form submission for updating a staff
  $("#updateStaffBtn").on("click", async function (e) {
    e.preventDefault();
    const id = $(this).data("id"); // Ensure the id is retrieved correctly
    const updatedStaff = {
      firstName: $("#updateFirstName").val(),
      lastName: $("#updateLastName").val(),
      designation: $("#updateDesignation").val(),
      gender: $("#updateGender").val(),
      conNo: $("#updateContactNumber").val(),
      email: $("#updateEmail").val(),
      addLine01: $("#updateAddress").val(),
      DOB: formatDate($("#updateDob").val()), // Format the date
      joinDate: formatDate($("#updateJoinDate").val()),
      role: $("#updateRole").val(),
    };

    await updateStaffMember(id, updatedStaff); // Pass the id to the function
    window.location.reload();
    closeUpdateStaffPopup();
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  // Fetch and populate staff data in the update form
  function attachEventHandlers() {
    // View staff details
    $(".action-button.view").on("click", function (e) {
      const id = $(this).data("id");
      StaffModel.getStaffById(id)
        .done(function (response) {
          $("#viewFirstName").text(response.firstName);
          $("#viewLastName").text(response.lastName);
          $("#viewDesignation").text(response.designation);
          $("#viewGender").text(response.gender);
          $("#viewContactNumber").text(response.conNo);
          $("#viewEmail").text(response.email);
          $("#viewAddress").text(response.addLine01);
          $("#viewDateOfBirth").text(response.dob);
          $("#viewJoinedDate").text(response.joinDate);
          $(".view-staff-popup").fadeIn();
        })
        .fail(function () {
          alert("Error fetching staff details");
        });
    });

    // Edit staff details
    $(".action-button.edit").on("click", function (e) {
      const id = $(this).data("id");
      StaffModel.getStaffById(id)
        .done(function (response) {
          $("#updateFirstName").val(response.firstName);
          $("#updateLastName").val(response.lastName);
          $("#updateDesignation").val(response.designation);
          $("#updateGender").val(response.gender);
          $("#updateContactNumber").val(response.conNo);
          $("#updateEmail").val(response.email);
          $("#updateAddress").val(response.addLine01);
          $("#updateDob").val(response.DOB);
          $("#updateJoinDate").val(response.joinDate);
          $("#updateRole").val(response.role);
          $("#updateStaffBtn").data("id", id); // Set the id on the update button
          showUpdateStaffPopup();
        })
        .fail(function () {
          alert("Error fetching staff details");
        });
    });
    // Delete staff
    $(".action-button.delete").on("click", function () {
      const staffId = $(this).data("id");
      if (confirm("Are you sure you want to delete this staff member?")) {
        StaffModel.deleteStaff(staffId)
          .done(function () {
            alert("Staff deleted successfully");
            loadStaffDatatoTable(); // Reload the staff data
          })
          .fail(function () {
            alert("Error deleting staff");
          });
      }
    });
  }
});

// Close update popup
$("#updateCloseButton").on("click", function () {
  $(".update-staff-popup").fadeOut();
});

const getAllStaffData = async () => {
  try {
    const response = await StaffModel.getAllStaff();
    return response;
  } catch (error) {
    console.error("Error loading staff data:", error);
    throw new Error("Failed to load staff data");
  }
};

const addStaffMember = async (staffDTO) => {
  console.log(staffDTO);
  StaffModel.postStaff(staffDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 201) {
        alert("Failed to add staff");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during staff addition:", error);
      alert("Failed to add staff");
      throw new Error("Failed to add staff");
    });
};

const updateStaffMember = async (id, staffDTO) => {
  console.log("Update Staff:", staffDTO);
  console.log("Update Staff ID:", id);
  StaffModel.updateStaff(id, staffDTO)
    .done((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 200) {
        alert("Failed to update staff");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during staff update:", error);
      alert("Failed to update staff");
      throw new Error("Failed to update staff");
    });
};
