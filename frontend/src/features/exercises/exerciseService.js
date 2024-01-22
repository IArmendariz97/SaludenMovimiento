import axios from "axios";
import { base_url } from "../../utils/utilities";

const getAllExercises = async () => {
  const response = await axios.get(`http://localhost:3000/api/v1/exercises`);
  return response.data;
};

const updateExercise = async (data, idExercise) => {
  try {
    const response = await axios.put(
      `${base_url}/exercises/${idExercise}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update rutines.");
  }
};

const createExercise = async (data) => {
  try {
    const response = await axios.post(`${base_url}/exercises`, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create rutine.");
  }
};

export const exerciseService = {
  getAllExercises,
  updateExercise,
  createExercise,
};
