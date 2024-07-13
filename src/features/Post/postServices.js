import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { generateAxiosConfig } from "../../utils/axiosconfig";

const getPosts = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(
    `${base_url}post/admin?deleted=false`,
    config
  );
  return response.data?.data;
};

const getPubldPosts = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}post/published`, config);
  return response.data?.data;
};

const getSchdPosts = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}post/scheduled`, config);
  return response.data?.data;
};
//

const getApprovedPosts = async (items) => {
  const config = generateAxiosConfig(items.token);
  const response = await axios.get(
    `${base_url}post/admin?status=${items.item}&deleted=false`,
    config
  );
  // console.log(response);
  return response.data?.data;
};

const getAPost = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(`${base_url}post/${ids.id}/admin`, config);
  // console.log(response);
  return response.data?.data;
};
//
const getAUserPosts = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(
    `${base_url}post/admin?status=false&deleted=false&userId=${ids.id}`,
    config
  );
  return response?.data?.data;
};
//
const getPostsCommented = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(
    `${base_url}post/commented?id=${ids.id}`,
    config
  );
  return response?.data?.data;
};
//
const getAPostComments = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(
    `${base_url}comment/${ids?.id}?page=${ids?.num}&limit=10`,
    config
  );
  // console.log(response);
  return response.data?.data;
};
//
const deletePostComment = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.delete(`${base_url}comment/${ids.id}`, config);
  // console.log(response);
  return response.data;
};
//
const approvePost = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.patch(
    `${base_url}post/approve`,
    {
      id: ids?.id,
    },
    config
  );
  return response.data;
};
//
const unApprovePost = async (ids) => {
  const id = ids.id;
  const config = generateAxiosConfig(ids.token);
  const response = await axios.patch(
    `${base_url}post/unapprove/all`,
    {
      posts: [...id],
    },
    config
  );
  return response.data;
};
//
const deletePost = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.delete(
    `${base_url}post/${ids.id}/admin`,
    config
  );
  return response.data;
};

// Get Graph metrics
const getMonthlyPost = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}post/monthly`, config);

  return response.data?.data;
};
//
const getDailyPosts = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}post/daily`, config);

  return response.data?.data;
};
//

const postCreate = async (data) => {
  const config = generateAxiosConfig(data.token);

  const response = await axios.post(
    `${base_url}post/admin`,
    data.formData,
    config
  );

  return response.data;
};
//
const postService = {
  getPubldPosts,
  getSchdPosts,
  postCreate,
  deletePostComment,
  getAPost,
  getPosts,
  getApprovedPosts,
  approvePost,
  deletePost,
  deletePost,
  getAUserPosts,
  getAPostComments,
  unApprovePost,
  getMonthlyPost,
  getDailyPosts,
  getPostsCommented,
};

export default postService;
