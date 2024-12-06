// Recent activities management
document.addEventListener("DOMContentLoaded", function () {
  const activities = [
    {
      type: "alert",
      message: "Disease detected in Tomato field B4",
      time: "2 hours ago",
    },
    {
      type: "success",
      message: "Irrigation completed in Wheat field A2",
      time: "4 hours ago",
    },
    {
      type: "info",
      message: "New crop health report available",
      time: "6 hours ago",
    },
  ];

  displayActivities(activities);
});

function displayActivities(activities) {
  const activityList = document.getElementById("activityList");

  activities.forEach((activity) => {
    const activityElement = createActivityElement(activity);
    activityList.appendChild(activityElement);
  });
}

function createActivityElement(activity) {
  const div = document.createElement("div");
  div.className = "activity-item";

  const icon = document.createElement("i");
  icon.className = getActivityIcon(activity.type);
  icon.style.color = getActivityColor(activity.type);

  const content = document.createElement("div");
  content.innerHTML = `
        <p>${activity.message}</p>
        <small>${activity.time}</small>
    `;

  div.appendChild(icon);
  div.appendChild(content);

  return div;
}

function getActivityIcon(type) {
  const icons = {
    alert: "fas fa-exclamation-circle",
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
  };
  return icons[type] || icons.info;
}

function getActivityColor(type) {
  const colors = {
    alert: "#e74c3c",
    success: "#2ecc71",
    info: "#3498db",
  };
  return colors[type] || colors.info;
}
