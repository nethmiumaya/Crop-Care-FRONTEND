$(document).ready(function () {
  function closeAddCropPopup() {
    $(".add-crop-popup").fadeOut();
  }
  function showAddStaffPopup() {
    $(".update-crop-popup").fadeIn();
  }

  $(".back-btn").on("click", function () {
    closeAddCropPopup();
  });
  // Show update staff popup
  $(".edit").on("click", function () {
    showAddStaffPopup();
  });

  // $("#crop-image").on("change", function (event) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const imgPreview = $("<img>").attr("src", e.target.result).css({
  //         "max-width": "100%",
  //         "margin-top": "10px",
  //       });
  //       const formGroup = $(event.target).closest(".form-group");
  //       formGroup.find("img").remove();
  //       formGroup.append(imgPreview);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // });
});
