function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
   }


var a = document.getElementById("loginBtn");
var x = document.getElementById("login");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    z.style.right = "-520px"; // Hide verification container
    a.className += " white-btn";
    b.className = "btn";
    c.className = "btn"; // Reset "Verify" button
    x.style.opacity = 1;
    y.style.opacity = 0;
    z.style.opacity = 0; // Hide verification container
}