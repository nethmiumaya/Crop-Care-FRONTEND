import EquipmentModel from "../model/EquipmentModel.js";
$(document).ready(function () {
  function showAddEquipmentPopup() {
    $(".add-equipment-popup").fadeIn();
  }
  function closeAddEquipmentPopUp() {
    $(".add-equipment-popup").fadeOut();
  }
  $(".add-equipment-button").on("click", function () {
    showAddEquipmentPopup();
  });
  // Fetch and display staff data
  function loadEquipmentData(allEquipmentData) {
    const EquipmentTableBody = $(".equipment-table tbody");
    EquipmentTableBody.empty(); // Clear existing rows

    allEquipmentData.forEach((equipment) => {
      console.log(equipment); // Log the equipment object to verify its structure
      const row = `
        <tr class="table-row" data-equipment='${JSON.stringify(equipment)}'>
          <td>${equipment.name}</td>
          <td>${equipment.type}</td>
          <td>${equipment.status}</td>
  
          <td>
            <button class="action-button delete" data-id="${
              equipment.equipmentCode
            }">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button view">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-button edit" data-id="${
              equipment.equipmentCode
            }">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      `;
      EquipmentTableBody.append(row);
    });
    attachEventHandlers();
  }
  // Load equipment data on page load

  async function loadEquipmentDataToTable() {
    try {
      const allVehicleData = await getAllEquipmentData();
      loadEquipmentData(allVehicleData);
    } catch (error) {
      console.error("Error loading equipment data:", error);
    }
  }

  loadEquipmentDataToTable();

  // Handle form submission for adding a new staff
  $("#equipmentSaveBtn").on("click", async function (e) {
    e.preventDefault();
    const newEquipment = {
      name: $("#equipment-name").val(),
      type: $("#equipment-type").val(),
      status: $("#equipmet-status").val(),
    };

    await addEquipmentMember(newEquipment);
    window.location.reload();
    closeAddEquipmentPopUp();
    // Reload the staff data
  });

  // Handle form submission for updating equipment
  $("#updateEquipmentBtn").on("click", async function (e) {
    e.preventDefault();
    const equipmentCode = $(this).data("id"); // Ensure the id is retrieved correctly
    const updatedEquipment = {
      name: $("#updateEquipmentName").val(),
      type: $("#updateEquipmentType").val(),
      status: $("#updateEquipmentStatus").val(),
    };

    await updateEquipmentMember(equipmentCode, updatedEquipment); // Pass the id to the function
    window.location.reload();
    closeUpdateEquipmentPopup();
  });

  function attachEventHandlers() {
    // View equipment details
    $(".action-button.view").on("click", function () {
      const equipmentData = $(this).closest(".table-row").data("equipment");

      $("#viewEquipmentName").text(equipmentData.name);
      $("#viewEquipmentType").text(equipmentData.type);
      $("#viewEquipmentStatus").text(equipmentData.status);
      $(".view-equipment-popup").fadeIn();
    });

    // Edit equipment details
    $(".action-button.edit").on("click", function (e) {
      const equipmentCode = $(this).data("id");
      EquipmentModel.getEquipmentById(equipmentCode)
        .done(function (response) {
          $("#updateEquipmentName").val(response.name);
          $("#updateEquipmentType").val(response.type);
          $("#updateEquipmentStatus").val(response.status);
          $("#updateEquipmentBtn").data("id", equipmentCode); // Set the id on the update button
          showUpdateEquipmentPopup();
        })
        .fail(function () {
          alert("Error fetching equipment details");
        });
    });
    // Delete equipment
    $(".action-button.delete").on("click", function () {
      const equipmentCode = $(this).data("id");
      if (confirm("Are you sure you want to delete this staff member?")) {
        EquipmentModel.deleteEquipment(equipmentCode)
          .done(function () {
            alert("equipment deleted successfully");
            loadEquipmentDataToTable(); // Reload the staff data
          })
          .fail(function () {
            alert("Error deleting equipment");
          });
      }
    });
  }
});

const getAllEquipmentData = async () => {
  try {
    const response = await EquipmentModel.getAllEquipment();
    return response;
  } catch (error) {
    console.error("Error loading equipment data:", error);
    throw new Error("Failed to load equipment data");
  }
};

const addEquipmentMember = async (equipmentDTO) => {
  console.log(equipmentDTO);
  EquipmentModel.postEquipment(equipmentDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 201) {
        alert("Failed to add staff");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during equipment addition:", error);
      alert("Failed to add equipment");
      throw new Error("Failed to add equipment");
    });
};

const updateEquipmentMember = async (equipmentCode, equipmentDTO) => {
  console.log("Update Equipment:", equipmentDTO);
  EquipmentModel.updateEquipment(equipmentCode, equipmentDTO)
    .done((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 200) {
        alert("Failed to update equipment");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during equipment update:", error);
      alert("Failed to update equipment");
      throw new Error("Failed to update equipment");
    });
};
