import axios from "axios";
import { jwtDecode } from "jwt-decode";

const authAxios = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "Application/json",
  },
});

async function refreshToken() {
  await axios
    .get("/auth/access-token", {
      baseURL: "http://localhost:8080",
      withCredentials: true,
      headers: {
        "Content-Type": "Application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.message);
      return;
    });
}

authAxios.interceptors.request.use(async function (config) {
  const cookies = decodeURIComponent(document.cookie).split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name == "access_token") {
      const data = jwtDecode(value);
      if (data.exp * 1000 < new Date().getTime()) {
        // Lấy access token mới.
        const token = await refreshToken();
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = `Bearer ${value}`;
      }
    }
  }
  return config;
});

export default authAxios;
