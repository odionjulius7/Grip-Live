import { useSelector } from "react-redux";

function useIsAuthenticated() {
  const userData = useSelector((state) => state.auth.user);
  const token = userData?.data?.token;
  // console.log(token);
  let isAuthenticated = false; // Default to false
  if (token !== null && token !== undefined && token !== "") {
    isAuthenticated = true;
  }

  return isAuthenticated;
}

export default useIsAuthenticated;
