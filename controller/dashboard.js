// Dashboard initialization and event handlers
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all dashboard components
  initializeNotifications();
  initializeSearchBar();
});

function initializeNotifications() {
  const notificationIcon = document.querySelector(".notifications");
  notificationIcon.addEventListener("click", () => {
    // Implement notification panel toggle
    console.log("Notifications clicked");
  });
}

function initializeSearchBar() {
  const searchInput = document.querySelector(".search-bar input");
  searchInput.addEventListener("input", (e) => {
    // Implement search functionality
    console.log("Searching for:", e.target.value);
  });
}
