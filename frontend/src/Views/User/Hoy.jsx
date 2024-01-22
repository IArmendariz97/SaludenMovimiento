import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRutines,
  updateRutineConfiguration,
} from "../../features/rutinas/rutinasSlice";
import ExerciseModal from "../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useParams } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "./Hoy.css";
import { getGroupRutines } from "../../features/group/groupSlice";
import {
  getUser,
  markDayAsTrained,
  getTrainingLogs,
  markDayAsUntrained,
} from "../../features/user/userSlice";
import { showSuccessNotification } from "../../features/layout/layoutSlice";

function Hoy() {
  const [currentDay, setCurrentDay] = useState(new Date().getUTCDay());

  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoading } = state.rutinas;
  const rutinas2 = state.rutinas.rutinas;
  const { rutinaGrupal } = state.groups;

  const { user, trainingLogs, message } = state.users;
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(trainingLogs, "trainingLog");
  const rutinas = rutinas2.concat(rutinaGrupal);
  const [hasExercises, setHasExercises] = useState(false);
  const [isDayTrained, setIsDayTrained] = useState();
  const localUser = JSON.parse(localStorage.getItem("User"));
  const [dispatchee, setDispatchee] = useState(false);
  const token = localUser.token;
  useEffect(() => {
    dispatch(getRutines(id));
    dispatch(getUser({ token, userId: id }));
    if (user && user.Client && !dispatchee) {
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
        })
      );
      setDispatchee(true);
    }
    dispatch(
      getGroupRutines({
        token,
        idGroup: user?.Client?.ClientGroups[0]?.idGroup,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    if (user && user.Client && !dispatchee) {
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex]?.routine?.idRoutine,
        })
      );
      setDispatchee(true);
    }
  }, [user]);

  console.log(trainingLogs, "traiinigLogs");

  useEffect(() => {
    if (rutinas) {
      const exerciseCards = getExerciseCards();
      setCards(exerciseCards);
    }

    // Determinar si la fecha actual está en trainingLogs
    const formattedDate = currentDate.toISOString().split("T")[0];
    const trainingLogsRutinaActual = trainingLogs?.filter(
      (logs) =>
        logs.idRoutine === rutinas[currentRoutineIndex].routine.idRoutine
    );
    const isDayTrained = trainingLogsRutinaActual?.some(
      (log) => log.date?.split("T")[0] === formattedDate
    );
    console.log(trainingLogsRutinaActual, isDayTrained, "ahaha");
    setIsDayTrained(isDayTrained);
  }, [currentDay, currentRoutineIndex, rutinas2, trainingLogs]);
  useEffect(() => {
    if (message === "Day marked as trained successfully") {
      showSuccessNotification("Exito!", "Dia marcado como entrenado");
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    }
    if (message === "Training log removed successfully") {
      showSuccessNotification("Exito!", "Dia marcado como NO entrenado");
      dispatch(
        getTrainingLogs({
          token,
          clientId: user?.Client?.idClient,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    }
  }),
    [message];
  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDayChange = (amount) => {
    const newDay = (currentDay + amount + 7) % 7;
    setCurrentDay(newDay);
    setHasExercises(false);
    // Actualizar la fecha al cambiar el día
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setDate(currentDateCopy.getDate() + amount);
    setCurrentDate(currentDateCopy);
  };

  const handleNextRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex < rutinas.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : rutinas.length - 1
    );
  };

  const getDayOfWeekString = (dayOfWeek) => {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    return daysOfWeek[dayOfWeek];
  };
  const handleEditExercise = (formData) => {
    const configuration = formData;
    const exerciseId = formData.exerciseId;
    dispatch(
      updateRutineConfiguration({
        configuration,
        exerciseId,
        day: getDayOfWeekString(currentDay),
        idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
      })
    );
    dispatch(getRutines(id));
    dispatch(
      getGroupRutines({
        token,
        idGroup: user?.Client?.ClientGroups[0]?.idGroup,
      })
    );
  };

  const handleMarkAsTrained = () => {
    const formattedDate = currentDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD" format

    if (isDayTrained) {
      // If the day is already marked as trained, unmark it
      dispatch(
        markDayAsUntrained({
          clientId: user?.Client?.idClient,
          date: formattedDate,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
      console.log(formattedDate, "formattedDate");
      console.log(rutinas[currentRoutineIndex].routine.idRoutine, "idRoutine");
    } else {
      // If the day is not marked as trained, mark it
      dispatch(
        markDayAsTrained({
          clientId: user?.Client?.idClient,
          date: formattedDate,
          idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
        })
      );
    }
  };

  const getExerciseCards = () => {
    const currentRoutine = rutinas && rutinas[currentRoutineIndex];
    if (!currentRoutine) return [];

    const { GroupExercises } = currentRoutine.routine;
    const hoy = getDayOfWeekString(currentDay);

    const exerciseCards = GroupExercises.reduce((acc, group) => {
      if (group.day === hoy) {
        setHasExercises(true);
        console.log(hasExercises);
        group.ExerciseConfigurations?.forEach((exercise) => {
          acc.push(
            <div
              key={exercise?.idExercise}
              onClick={() => handleCardClick(exercise)}
              className="exercise-card-container mb-4 cursor-pointer border hover:border-blue-500"
            >
              <div className="flex">
                <div className="exercise-card-images">
                  <img
                    src={exercise?.Exercise.image1}
                    alt={`Imagen de ${exercise?.name}`}
                    className="w-32 h-auto object-cover rounded-l-lg"
                  />
                  <img
                    src={exercise?.Exercise.image2}
                    alt={`Imagen de ${exercise?.name}`}
                    className="w-32 h-auto object-cover rounded-r-lg"
                  />
                </div>
                <div className="exercise-card-details p-4">
                  <div className="mb-2 font-bold">
                    <Typography.Text>
                      ID: {exercise?.idExercise}
                    </Typography.Text>
                  </div>
                  <div className="mb-2">
                    <Typography.Text>{exercise?.Exercise.name}</Typography.Text>
                  </div>
                  {/* <div className="flex gap-4 justify-center">
                    <img
                      src={exercise?.Exercise.image1}
                      alt={`Imagen de ${exercise?.name}`}
                      className="w-32 h-32 object-cover mb-2 rounded-full"
                    />
                    <img
                      src={exercise?.Exercise.image2}
                      alt={`Imagen de ${exercise?.name}`}
                      className="w-32 h-32 object-cover mb-2 rounded-full"
                    />
                  </div> */}
                  <div className="text-center md:text-left">
                    <h5 className="text-base font-semibold mb-2">
                      {exercise.series}x{exercise.repetitions}
                    </h5>
                    <h5 className="text-base font-semibold mb-2">
                      {exercise.weight} kg
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }

      return acc;
    }, []);

    return exerciseCards;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("es-ES", options);

  return (
    <div className="hoy-container">
      <h2 className="text-2xl font-bold mb-4">
        {rutinas && rutinas.length > 1 && (
          <>
            {currentRoutineIndex === 0 ? null : (
              <LeftOutlined
                className="cursor-pointer text-2xl"
                onClick={handlePrevRoutine}
              />
            )}
            {rutinas &&
              rutinas.length > 0 &&
              rutinas[currentRoutineIndex]?.routine?.name}
            {currentRoutineIndex === rutinas.length - 2 ? null : (
              <RightOutlined
                className="cursor-pointer text-2xl"
                onClick={handleNextRoutine}
              />
            )}
          </>
        )}
      </h2>

      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(-1)}
        >
          <LeftOutlined />
        </button>
        <span className="text-lg font-semibold">{formattedDate}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDayChange(1)}
        >
          <RightOutlined />
        </button>
      </div>

      <div className="exercise-cards-container">{cards}</div>
      {!hasExercises ? (
        <p className="text-center text-lg font-bold mb-4">
          NO TIENES EJERCICIOS ESTE DÍA
        </p>
      ) : null}

      {hasExercises && (
        <button
          className={`bg-${isDayTrained ? "red" : "green"}-500 hover:bg-${
            isDayTrained ? "red" : "green"
          }-700 text-white font-bold py-2 px-4 rounded`}
          onClick={handleMarkAsTrained}
        >
          {isDayTrained
            ? "Marcar día como NO entrenado"
            : "Marcar día como entrenado"}
        </button>
      )}
      {showModal ? (
        <div>
          <ExerciseModal
            exercise={selectedExercise}
            closeModal={closeModal}
            day={getDayOfWeekString(currentDay)}
            handleEditExercise={handleEditExercise}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Hoy;
