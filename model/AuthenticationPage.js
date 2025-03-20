function userRegistration(){
    console.log("clicked");

    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let role = $("#role").val();
    console.log(email,password,name,role);

    $.ajax({
        url:"http://localhost:8080/api/v1/auth/signUp",
        method: "POST",
        contentType: "application/json",
        headers:{"Authorization":"Bearer "+localStorage.getItem("token")},
        data:JSON.stringify({
            name:name,
            email:email,
            password:password,
            role:role
        }),
        success: function(response){
            console.log(response.data.token)
            const token = response.data.token;
            localStorage.setItem("token",token);
            alert("User Registration Successful");
        },
        error: function(error){
            console.log("Error During the Registration ",error);
            alert("User Registration Failed");
        }
    })
}