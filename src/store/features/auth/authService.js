import axios from "axios";

// use this function in authslice.js => createAsyncTahunk
const loginUser = async (inputValues) => {
  const axiosResponse = axios
    .post(`${import.meta.env.VITE_BASE_URL}/users/login`, inputValues, {
      withCredentials: true, // axios send automatically cookies when we apply this property
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      window.localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return axiosResponse;
};

const authService = { loginUser };
export default authService;
