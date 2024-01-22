import axios from "axios";
import { base_url } from "../../utils/utilities";

const updateUser = async (data) => {
  const response = await axios.put(`${base_url}/users/update/${data.userId}`, {
    newUser: data.newUser,
    oldPassword: data.oldPassword,
  });

  return response.data;
};

const getUsers = async (token) => {
  console.log("estoy pidiendo usuarios");
  const response = await axios.get(`${base_url}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getClients = async (token) => {
  const response = await axios.get(`${base_url}/users/allClients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addUserToClients = async (token, userId) => {
  const response = await axios.post(
    `${base_url}/users/createClient`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getUser = async (token, userId) => {
  const response = await axios(`${base_url}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteUser = async (data) => {
  const response = await axios.post(
    `${base_url}/users/delete/${data.userId}`,
    data
  );

  return response.data;
};

const getCoaches = async (token) => {
  const response = await axios.get(`${base_url}/coach`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const markDayAsTrained = async (clientId, date, idRoutine) => {
  const response = await axios.put(
    `${base_url}/users/entrenamientos/${clientId}`,
    {
      date,
      idRoutine,
    }
  );

  return response.data;
};

const getTrainingLogs = async (token, clientId, idRoutine) => {
  const response = await axios.get(
    `${base_url}/users/entrenamientos/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        idRoutine,
      },
    }
  );

  return response.data;
};

const markDayAsUntrained = async (clientId, date, idRoutine) => {
  console.log(date, "dateeeeeeeeeee");
  const response = await axios.delete(
    `${base_url}/users/entrenamientos/${clientId}`,
    {
      data: {
        date,
        idRoutine,
      },
    }
  );

  return response.data;
};

export const userService = {
  updateUser,
  addUserToClients,
  getClients,
  getUser,
  getUsers,
  deleteUser,
  getCoaches,
  markDayAsTrained,
  getTrainingLogs,
  markDayAsUntrained,
};
