// axiosConfig.js
export const generateAxiosConfig = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token || ""}`,
      Accept: "application/json",
    },
  };

  return config;
};

// const getTokenFromLocalStorage = localStorage.getItem("grip")
//   ? JSON.parse(localStorage.getItem("grip"))
//   : null;
// console.log(getTokenFromLocalStorage);
// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null
//         ? getTokenFromLocalStorage?.data?.token
//         : ""
//     }`,
//     Accept: "application/json",
//   },
// };
