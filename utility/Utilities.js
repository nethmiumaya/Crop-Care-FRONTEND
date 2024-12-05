//Retrieved JWT token from cookie storage (more secure than local storage)
export const getJwtToken = () => {
  console.log(JSON.parse(localStorage.getItem("jwtToken")));
  // console.log(localStorage.getItem("jwtToken"));
  return JSON.parse(localStorage.getItem("jwtToken"));
};
