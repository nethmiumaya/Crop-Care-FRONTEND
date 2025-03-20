$(document).ready(function () {
  function updateDateTime() {
    const now = new Date();

    // Format date: Saturday, March 20 2024
    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    $("#current-date").text(now.toLocaleDateString("en-US", dateOptions));

    // Format time: 16:45:12
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    $("#current-time").text(now.toLocaleTimeString("en-US", timeOptions));
  }

  // Update initially and then every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // Navigation handling
  $(".nav-item").click(function () {
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
    $("#contentAreaFrame").attr("src", $(this).data("page"));
  });

  // Logout handling
  $(".logout").click(() => {
    window.location.href = "/index.html";
  });
});
