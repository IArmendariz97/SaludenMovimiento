import WorkoutCard from "./WorkoutCard";
import { v4 as uuidv4 } from "uuid";
import "./WorkoutContainer.css";
function WorkoutContainer({ workouts, setWorkouts }) {
  function deleteCard(id) {
    fetch(`http://localhost:3000/workouts/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
        setWorkouts(updatedWorkouts);
      })
      .catch(console.error);
  }

  function populateWorkoutCards() {
    return workouts?.map((workout) => (
      <WorkoutCard key={uuidv4()} workout={workout} deleteCard={deleteCard} />
    ));
  }

  return (
    <div className="row justify-content-center">
      <h1 className="display-2 text-center">Lista de rutinas</h1>
      {populateWorkoutCards()}
    </div>
  );
}

export default WorkoutContainer;
