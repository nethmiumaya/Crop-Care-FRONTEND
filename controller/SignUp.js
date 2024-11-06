function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
   }
var b = document.getElementById("registerBtn");
var y = document.getElementById("register");

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    z.style.right = "-520px"; // Hide verification container
    a.className = "btn";
    b.className += " white-btn";
    c.className = "btn"; // Reset "Verify" button
    x.style.opacity = 0;
    y.style.opacity = 1;
    z.style.opacity = 0; // Hide verification container
}
