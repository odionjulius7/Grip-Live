import axios from "axios"; // Import the generateAxiosConfig function
import { base_url } from "../../utils/baseUrl";
import { generateAxiosConfig } from "../../utils/axiosconfig";
// import { config } from "utils/axiosconfig";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/adminLogin`, user);
  if (response.data) {
    localStorage.setItem("grip", JSON.stringify(response.data));
  }

  return response.data;
};

const changePassword = async (user) => {
  const { token, oldPassword, newPassword } = user;
  const config = generateAxiosConfig(token);
  const response = await axios.post(
    `${base_url}user/password`,
    { oldPassword, newPassword },
    config
  );

  return response.data;
};

const getUsers = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}user/all`, config);
  console.log(config);
  return response.data;
};

const authService = {
  login,
  getUsers,
  changePassword,
};

export default authService;

// import axios from "axios";
// import { config } from "../../utils/axiosconfig";
// import { base_url } from "../../utils/baseUrl";

// const login = async (user) => {
//   const response = await axios.post(`${base_url}user/adminLogin`, user);
//   if (response.data) {
//     localStorage.setItem("grip", JSON.stringify(response.data));
//   }

//   const getUserfromLocalStorage = localStorage.getItem("grip")
//     ? JSON.parse(localStorage.getItem("grip"))
//     : null;

//   return response.data;
// };

// const getUsers = async () => {
//   const response = await axios.get(`${base_url}user/all`, config);

//   return response.data;
// };

// const authService = {
//   login,
//   getUsers,
// };

// export default authService;
