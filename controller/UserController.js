import UserModel from "../model/UsersModel.js";
$(document).ready(function () {
  function showAddFieldPopup() {
    $(".add-user-popup").fadeIn();
  }

  // Show add user popup
  $(".add-user-button").on("click", function () {
    showAddFieldPopup();
  });
  // Fetch and display staff data
  function loadUserData(allUserData) {
    const UserTableBody = $(".user-table tbody");
    UserTableBody.empty(); // Clear existing rows

    allUserData.forEach((user) => {
      console.log(user); // Log the equipment object to verify its structure
      const row = `
        <tr class="table-row" data-user='${JSON.stringify(user)}'>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="action-button delete" data-id="${user.email}">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button view" data-id="${user.email}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-button edit" data-id="${user.email}">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
      UserTableBody.append(row);
    });
    attachEventHandlers();
  }
  // Load equipment data on page load

  async function loadUserDataToTable() {
    try {
      const allVehicleData = await getAllUserData();
      loadUserData(allVehicleData);
    } catch (error) {
      console.error("Error loading equipment data:", error);
    }
  }

  loadUserDataToTable();

  // Handle form submission for adding a new staff
  $("#saveUserBtn").on("click", async function (e) {
    e.preventDefault();
    const newUser = {
      email: $("#Email").val(),
      password: $("#Password").val(),
    };

    await addUserMember(newUser);
    window.location.reload();
    closeUserPopup();
    // Reload the staff data
  });

  function attachEventHandlers() {
    // Delete user
    $(".action-button.delete").on("click", function () {
      const email = $(this).data("id");
      if (confirm("Are you sure you want to delete this user member?")) {
        UserModel.deleteUser(email)
          .done(function () {
            alert("User deleted successfully");
            loadUserDataToTable(); // Reload the staff data
          })
          .fail(function () {
            alert("Error deleting user");
          });
      }
    });

    //view user details
    $(".action-button.view").on("click", function () {
      const userData = $(this).closest(".table-row").data("user");

      $("#viewEmail").text(userData.email);
      $("#viewRole").text(userData.role);

      $(".view-user-popup").fadeIn();
    });
  }
});
const getAllUserData = async () => {
  try {
    const response = await UserModel.getAllUser();
    return response;
  } catch (error) {
    console.error("Error loading equipment data:", error);
    throw new Error("Failed to load equipment data");
  }
};

const addUserMember = async (userDTO) => {
  console.log(userDTO);
  UserModel.postUser(userDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 201) {
        alert("Failed to add user");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during user addition:", error);
      alert("Failed to add user");
      throw new Error("Failed to add user");
    });
};
