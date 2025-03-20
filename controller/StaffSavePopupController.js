$(document).ready(function () {
  function closeAddStaffPopup() {
    $(".add-staff-popup").fadeOut();
  }
  function showUpdateEquipmentPopup() {
    $(".update-staff-popup").fadeIn();
  }
  $(".back-btn").on("click", function () {
    closeAddStaffPopup();
  });
  $(".edit").on("click", function () {
    showUpdateEquipmentPopup();
  });

  $("form").on("submit", function (e) {
    e.preventDefault();
    const formData = {
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      designation: $("#designation").val(),
      gender: $("#gender").val(),
      contactNo: $("#contact-no").val(),
      dob: $("#dob").val(),
      joinDate: $("#join-date").val(),
      email: $("#email").val(),
      address: $("#address").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/staff",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        alert("Staff added successfully");
        closeAddStaffPopup();
        loadStaffData(); // Reload the staff data
      },
      error: function (error) {
        alert("Error adding staff");
      },
    });
  });
});
