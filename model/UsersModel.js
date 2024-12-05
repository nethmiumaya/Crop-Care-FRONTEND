import { getJwtToken } from "../utility/Utilities.js";

const UserModel = {
  getAllUser: function () {
    return $.ajax({
      url: "http://localhost:5050/main/api/v1/user/all",
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during user retrieval:", error);
        throw new Error("Failed to retrieve user");
      },
    });
  },

  //post user
  postUser: function (newUser) {
    console.log(" Post User : ", newUser);
    return $.ajax({
      type: "POST",
      url: "http://localhost:5050/main/api/v1/auth/signUp",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      contentType: "application/json",
      data: JSON.stringify(newUser),
    });
  },
  
  //delete user
  deleteUser: function (email) {
    const url = `http://localhost:5050/main/api/v1/user/${email}`;
    const headers = {
      Authorization: `Bearer ${getJwtToken()}`,
    };
    console.log("URL:", url);
    console.log("Headers:", headers);

    return $.ajax({
      type: "DELETE",
      url: url,
      headers: headers,
      success: function () {
        return "User deleted successfully";
      },
      error: function (xhr, status, error) {
        console.error("Error deleting User:", error);
        throw new Error("Failed to delete User");
      },
    });
  },

  getUserByEmail: function (email) {
    return $.ajax({
      url: `http://localhost:5050/main/api/v1/user/${email}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching user details:", error);
        throw new Error("Failed to fetch user details");
      },
    });
  },
};

export default UserModel;
