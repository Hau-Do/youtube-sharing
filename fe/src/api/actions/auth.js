import API from "api";
import config from "api/config";

const login = async (data) => {
  const response = await API({
    url: `${config.API.AUTH_SERVICE}/login`,
    data,
    method: "POST",
  });
  return response;
};

const register = async (data) => {
  const response = await API({
    url: `${config.API.AUTH_SERVICE}/register`,
    data,
    method: "POST",
  });
  return response;
};

const AuthAPI = {
  login,
  register,
};

export default AuthAPI;
