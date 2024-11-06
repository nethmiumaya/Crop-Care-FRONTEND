function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
   }
var c = document.getElementById("verifyBtn");
var z = document.getElementById("verify");

function verify() {
    x.style.left = "-510px";
    y.style.right = "-520px"; // Hide registration container
    z.style.right = "5px"; // Show verification container
    a.className = "btn";
    b.className = "btn"; // Reset "Sign Up" button
    c.className += " white-btn"; // Highlight "Verify" button
    x.style.opacity = 0;
    y.style.opacity = 0; // Hide registration container
    z.style.opacity = 1; // Show verification container
}