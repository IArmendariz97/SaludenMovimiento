import { useEffect, useState } from "react";
import axios from "axios";
import AddedExerciseContainer from "./AddedExerciseContainer";
import WorkoutEditForm from "./WorkoutEditForm";
import { useParams } from "react-router-dom";
function Workout({ exercises = {}, workouts = {}, setWorkouts = {} }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [workout, setWorkout] = useState({ exercises: [] });

  const params = useParams();
  const id = params.id;

  function handleButtonClick() {
    setShowEditForm((prevState) => !prevState);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/workouts/${id}`)
      .then((resp) => setWorkout(resp.data))
      .catch(console.error);
  }, [id]);

  async function handleEditWorkout(workout, data) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/workouts/${workout.id}`,
        data
      );
      const updatedWorkouts = workouts.map((workout) => {
        if (workout.id === response.data.id) return response.data;
        return workout;
      });
      setWorkouts(updatedWorkouts);
      setWorkout(response.data);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  }

  return (
    <div>
      <h1 className="display-4 text-center">{workout.name}</h1>
      <p className="mx-5 my-3 h6 text-center">{workout.description}</p>
      {showEditForm ? (
        <WorkoutEditForm
          workout={workout}
          handleEditWorkout={handleEditWorkout}
        />
      ) : null}
      <div className="m-3 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleButtonClick}>
          {showEditForm ? "Close Form" : "Edit Workout"}
        </button>
      </div>
      <AddedExerciseContainer
        addedExercises={workout.exercises}
        exercises={exercises}
      />
    </div>
  );
}

export default Workout;
