// Chart configurations and data
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("cropHealthChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Healthy Crops",
          data: [65, 78, 66, 74, 85, 80],
          borderColor: "#2ecc71",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Affected Crops",
          data: [28, 22, 21, 15, 12, 15],
          borderColor: "#e74c3c",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Crop Health Trends",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
