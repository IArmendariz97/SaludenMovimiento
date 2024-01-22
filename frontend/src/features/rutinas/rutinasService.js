import axios from "axios";
import { base_url } from "../../utils/utilities";

const getRutines = async (userId, token) => {
  try {
    const response = await axios.get(`${base_url}/users/${userId}/routines`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userRoutines = response.data;
    console.log(userRoutines, "userRoutines");
    // Obtener un array de promesas para las solicitudes de rutinas individuales
    const routinePromises = userRoutines.routines.map(async (routine) => {
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
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    throw error;
  }
};

const getAllRutines = async () => {
  const response = await axios.get(`${base_url}/get-all-rutinas`);
  return response.data;
};

const updateRutine = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}/routines/${data.idRoutine}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update rutines.");
  }
};
const updateRutineConfiguration = async (data) => {
  try {
    const response = await axios.put(
      `${base_url}/routines/config/${data.idRoutine}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update rutines.");
  }
};

const createRutine = async (data, token) => {
  try {
    const response = await axios.post(`${base_url}/routines`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create rutine.");
  }
};

export const rutinasService = {
  getRutines,
  getAllRutines,
  updateRutine,
  updateRutineConfiguration,
  createRutine,
};
