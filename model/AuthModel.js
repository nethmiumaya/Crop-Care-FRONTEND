const AuthModel = {
  signIn: function (signInDto) {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/auth/signIn",
      type: "POST",
      data: JSON.stringify(signInDto),
      contentType: "application/json",
    });
  },
};

export default AuthModel;