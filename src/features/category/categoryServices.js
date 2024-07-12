import axios from "axios"; // Import the generateAxiosConfig function
import { base_url } from "../../utils/baseUrl";
import { generateAxiosConfig } from "../../utils/axiosconfig";

const createTag = async (items) => {
  const { name, token } = items;
  //
  const config = generateAxiosConfig(token);
  const response = await axios.post(`${base_url}category`, { name }, config);

  return response.data;
};

const getCategories = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}category`, config);
  // console.log(config);
  return response.data;
};

const categoryService = {
  getCategories,
  createTag,
};

export default categoryService;

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

// const authService = {
//   login,
//   getUsers,
// };

// export default authService;
