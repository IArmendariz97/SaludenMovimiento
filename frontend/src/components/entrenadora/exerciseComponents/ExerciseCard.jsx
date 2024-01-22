import { useState } from "react";
import ExerciseModal from "./ExerciseModal";
import "./ExerciseCard.css";

function ExerciseCard({ exercise, handleEditExercise }) {
  const [showModal, setShowModal] = useState(false);

  function handleCardClick() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }
  return (
    <div className=" m-3 border-2 border-white w-1/3 rounded-lg">
      <div className="card highlight shadow" onClick={handleCardClick}>
        <div className="card-body">
          <h5 className="card-title">{exercise.name}</h5>
          <h6 className="card-subtitle">{exercise.type}</h6>
        </div>
      </div>

      {showModal ? (
        <ExerciseModal
          exercise={exercise}
          closeModal={closeModal}
          handleEditExercise={handleEditExercise}
        />
      ) : null}
    </div>
  );
}

export default ExerciseCard;
