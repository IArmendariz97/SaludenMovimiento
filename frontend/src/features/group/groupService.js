// services/groupService.js
import axios from "axios";
import { base_url } from "../../utils/utilities";

const createGroup = async (token, groupData) => {
  const response = await axios.post(`${base_url}/groups`, groupData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getGroup = async (token, idGroup) => {
  const response = await axios.get(`${base_url}/groups/${idGroup}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteGroup = async (token, idGroup) => {
  const response = await axios.delete(`${base_url}/groups/${idGroup}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getGroups = async (token) => {
  const response = await axios.get(`${base_url}/groups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteClientFromGroup = async (token, data) => {
  const response = await axios.put(
    `${base_url}/groups/deleteClient/${data.idGroup}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
const getGroupRutines = async (token, idGroup) => {
  const response = await axios.get(`${base_url}/groups/routines/${idGroup}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const groupRoutines = response.data;

  const routinePromises = groupRoutines.routines.map(async (routine) => {
    const routineResponse = await axios.get(
      `${base_url}/routines/${routine.idRoutine}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(routineResponse.data, "routineResponse.data");
    return routineResponse.data;
  });

  // Esperar a que todas las solicitudes se completen
  const routinesDetails = await Promise.all(routinePromises);
  return routinesDetails;
};

const addClientToGroup = async (token, data) => {
  const response = await axios.put(
    `${base_url}/groups/addClient/${data.idGroup}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const setRoutineGroup = async (token, data) => {
  const response = await axios.post(`${base_url}/groups/routine`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const groupService = {
  createGroup,
  getGroup,
  getGroups,
  setRoutineGroup,
  deleteGroup,
  deleteClientFromGroup,
  getGroupRutines,
  addClientToGroup,
};
