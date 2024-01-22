import axios from "axios";

const login = async (user) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/auth/login`,
    user
  );

  return response.data;
};

const logout = async (userId, token) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/logout/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    `http://localhost:3000/api/v1/auth/register`,
    data
  );

  return response.data;
};

export const authService = {
  login,
  logout,
  register,
};
