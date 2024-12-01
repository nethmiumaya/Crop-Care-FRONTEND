// Toggle menu for mobile responsiveness
function myMenuFunction() {
  var i = document.getElementById("navMenu");
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

// Get elements for the buttons and sections
var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var c = document.getElementById("verifyBtn");
var fpBtn = document.getElementById("forgotPasswordBtn"); // Forgot Password button

var x = document.getElementById("login"); // Login section
var y = document.getElementById("register"); // Register section
var z = document.getElementById("verify"); // Verification section
var fp = document.getElementById("forgotPassword"); // Forgot Password section

// Set initial state
window.onload = function () {
  login(); // Ensure only the login section is visible initially
};

// Login function
function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  z.style.right = "-520px"; // Hide verification container
  fp.style.right = "-520px"; // Hide forgot password container
  a.className += " white-btn";
  b.className = "btn";
  c.className = "btn"; // Reset "Verify" button
  x.style.opacity = 1;
  y.style.opacity = 0;
  z.style.opacity = 0; // Hide verification container
  fp.style.opacity = 0; // Hide forgot password container
}

// Register function
function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  z.style.right = "-520px"; // Hide verification container
  fp.style.right = "-520px"; // Hide forgot password container
  a.className = "btn";
  b.className += " white-btn";
  c.className = "btn"; // Reset "Verify" button
  x.style.opacity = 0;
  y.style.opacity = 1;
  z.style.opacity = 0; // Hide verification container
  fp.style.opacity = 0; // Hide forgot password container
}

// Verify function
function verify() {
  x.style.left = "-510px";
  y.style.right = "-520px"; // Hide registration container
  z.style.right = "5px"; // Show verification container
  fp.style.right = "-520px"; // Hide forgot password container
  a.className = "btn";
  b.className = "btn"; // Reset "Sign Up" button
  c.className += " white-btn"; // Highlight "Verify" button
  x.style.opacity = 0;
  y.style.opacity = 0; // Hide registration container
  z.style.opacity = 1; // Show verification container
  fp.style.opacity = 0; // Hide forgot password container
}

// Forgot Password function
function forgotPassword() {
  x.style.left = "-510px"; // Hide login section
  y.style.right = "-520px"; // Hide register section
  z.style.right = "-520px"; // Hide verify section
  fp.style.right = "5px"; // Show forgot password section
  a.className = "btn";
  b.className = "btn"; // Reset "Sign Up" button
  c.className = "btn"; // Reset "Verify" button
  fpBtn.className += " white-btn"; // Highlight forgot password button
  x.style.opacity = 0;
  y.style.opacity = 0;
  z.style.opacity = 0; // Hide verify and register sections
  fp.style.opacity = 1; // Show forgot password section
}

// Handle login
function handleLogin(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  $.ajax({
    url: "http://localhost:5050/main/api/v1/auth/signIn", // Replace with your back-end login URL
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: username, password: password }),
    success: function (response) {
      // Handle successful login
      console.log("Login successful:", response);
      // Store the JWT in local storage
      localStorage.setItem("token", response.token);
      // Redirect to another page or show a success message
      window.location.href = "/pages/homePage.html"; // Example redirect
    },
    error: function (xhr, status, error) {
      // Handle login error
      console.error("Login failed:", error);
      // Show an error message to the user
      alert("Login failed: " + error);
    },
  });
}

// Handle sign up
function handleSignUp(event) {
  event.preventDefault(); // Prevent form submission

  var email = document.getElementById("reg-email").value;
  var password = document.getElementById("reg-password").value;
  var confirmPassword = document.getElementById("reg-confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  $.ajax({
    url: "http://localhost:5050/main/api/v1/auth/signUp", // Replace with your back-end sign-up URL
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email: email, password: password }),
    success: function (response) {
      // Handle successful sign-up
      console.log("Sign-up successful:", response);
      // Redirect to login page or show a success message
      window.location.href = "/pages/homePage.html";
    },
    error: function (xhr, status, error) {
      // Handle sign-up error
      console.error("Sign-up failed:", error);
      // Show an error message to the user
      alert("Sign-up failed: " + error);
    },
  });
}
