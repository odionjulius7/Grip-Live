import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { generateAxiosConfig } from "../../utils/axiosconfig";

const getUsers = async (nums) => {
  const config = generateAxiosConfig(nums.token);
  const response = await axios.get(
    `${base_url}user/all?page=${nums.num}&limit=15&role=user`, // because users and creators are same array i'm separating them
    config
  );
  // console.log(config);
  return response.data;
};
// Search Users
const searchUserByName = async (nums) => {
  const config = generateAxiosConfig(nums.token);
  const response = await axios.get(
    `${base_url}user/all?username=${nums.username}&role=user`,
    config
  );
  // console.log(config);
  return response.data;
};
// Search Users
const searchCreatorsByName = async (nums) => {
  const config = generateAxiosConfig(nums.token);
  const response = await axios.get(
    `${base_url}user/all?username=${nums.username}&role=creator`,
    config
  );
  // console.log(config);
  return response.data;
};

const getSuspUsers = async (nums) => {
  const config = generateAxiosConfig(nums.token);
  const response = await axios.get(
    `${base_url}user/all?page=${nums.num}&limit=20`, // because users and creators are same array i'm separating them
    config
  );

  return response.data;
};

const getCreatorUsers = async (nums) => {
  const config = generateAxiosConfig(nums.token);
  const response = await axios.get(
    `${base_url}user/all?page=${nums.num}&limit=15&role=creator`,
    config
  );
  // console.log(response?.data?.data);
  return response.data;
};

const getUsersAggregate = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}user/summary`, config);
  // console.log(response);
  return response.data.data;
};

const getAUser = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(`${base_url}user/${ids.id}`, config);

  return response.data?.data;
};

const suspendAUser = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  try {
    const response = await axios.patch(
      `${base_url}user/suspend/${ids.id}`,
      null,
      config
    );
    return response.data?.data;
  } catch (error) {
    console.log(error);
    // Handle the error as needed
    return null;
  }
};
const UnsuspendAUser = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  try {
    const response = await axios.patch(
      `${base_url}user/unsuspend/${ids.id}`,
      null,
      config
    );
    return response.data?.data;
  } catch (error) {
    console.log(error);
    // Handle the error as needed
    return null;
  }
};

const getMonthlyUsers = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}user/monthly`, config);
  // console.log(response.data?.data);
  return response.data?.data;
};

const getDailyUsers = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}user/daily`, config);

  return response.data?.data;
};

const getUserBookmarks = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}bookmark/admin`, config);

  return response.data?.data;
};

const changeUserRole = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.post(
    `${base_url}user/role/${ids.id}`,
    {
      userType: "creator",
    },
    config
  );
  // console.log(response);
  return response.data?.data;
};

const getUsersByTopics = async (items) => {
  const config = generateAxiosConfig(items.token);
  const response = await axios.get(
    `${base_url}user/all?topic=${items.item}`,
    config
  );
  // console.log(response);
  return response.data?.data;
};

const usersService = {
  getUsers,
  getUsersAggregate,
  getAUser,
  getCreatorUsers,
  changeUserRole,
  getSuspUsers,
  getMonthlyUsers,
  getDailyUsers,
  getUsersByTopics,
  suspendAUser,
  UnsuspendAUser,
  searchUserByName,
  searchCreatorsByName,
  getUserBookmarks,
};

export default usersService;
