import React, { useState } from "react";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
function ExerciseContainer({ exercises, setExercises }) {
  const [showForm, setShowForm] = useState(false);

  function populateCards() {
    return exercises?.map((exercise) => (
      <ExerciseCard
        key={exercise.id}
        exercise={exercise}
        handleEditExercise={handleEditExercise}
      />
    ));
  }

  async function handleEditExercise(exercise, data) {
    try {
      const response = await axios.patch(
        `http://localhost:3001/exercises/${exercise.id}`,
        data
      );
      const updatedExercises = exercises.map((exercise) => {
        if (exercise.id === response.data.id) return response.data;
        return exercise;
      });
      setExercises(updatedExercises);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  }

  async function handlePostExercise(data) {
    try {
      const response = await axios.post(
        `http://localhost:3001/exercises`,
        data
      );
      setExercises([...exercises, response.data]);
    } catch (error) {
      console.error("Error posting exercise:", error);
    }
  }

  function handleButtonClick() {
    setShowForm((prevState) => !prevState);
  }
  return (
    <div className="relative">
      <h1 className="display-2 text-center">Explorar Ejercicios</h1>
      <div className="flex flex-col justify-center">
        {showForm ? <ExerciseForm onSubmit={handlePostExercise} /> : null}
        <div className="flex flex-col justify-center m-2">
          <button
            className="btn btn-primary w-fit m-auto"
            onClick={handleButtonClick}
          >
            {showForm ? "Close Form" : "Add an Exercise"}
          </button>
        </div>
        <div className="w-full flex flex-wrap justify-center">
          {populateCards()}
        </div>
      </div>
    </div>
  );
}

export default ExerciseContainer;
