import { useState, useEffect, useRef } from "react";

import { DatePicker, Typography } from "antd";
import moment from "moment";
import { MdArrowDownward, MdArrowUpward, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getAllExercises } from "@/features/exercises/exerciseSlice";

import { updateRutine } from "@/features/rutinas/rutinasSlice";
import { useSelector } from "react-redux";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";

const initialState = {
  name: "",
  startDate: moment().format("YYYY-MM-DD"),
  endDate: moment().add(1, "weeks").format("YYYY-MM-DD"),
  exercisesGroup: {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  },
  objective: "",
  observation: "",
};

function EditarRutinas({ rutinas }) {
  const { exercises } = useSelector((state) => state.exercises);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const [startDate, setStartDate] = useState(moment());
  const [durationInWeeks, setDurationInWeeks] = useState(1);
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const { message } = useSelector((state) => state.rutinas);
  const [visibleExercises, setVisibleExercises] = useState(20); // Número de ejercicios iniciales visibles
  const [scrollHeight, setScrollHeight] = useState(0);
  const daySectionRef = useRef(null); // Ref para la sección de los días
  const [searchTerm, setSearchTerm] = useState("");
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const filteredExercises =
    exercises &&
    exercises?.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  console.log(rutinas, "rutinasssss");
  useEffect(() => {
    if (message === "Routine updated successfully") {
      dispatch(
        showSuccessNotification("Exito", "Rutina editada correctamente")
      );
    }
  }, [message]);

  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExercises());
    } else {
      const types = [...new Set(exercises.map((exercise) => exercise.type))];
      setExerciseTypes(types);
    }

    if (rutinas && rutinas.length !== 0) {
      const editRoutine = rutinas[currentRoutineIndex]?.routine;

      let exercisesGroup = {
        Lunes: {},
        Martes: {},
        Miercoles: {},
        Jueves: {},
        Viernes: {},
        Sabado: {},
      };

      editRoutine?.GroupExercises.forEach((groupExercise) => {
        if (groupExercise.ExerciseConfigurations.length > 0) {
          for (
            let i = 0;
            i < groupExercise.ExerciseConfigurations.length;
            i++
          ) {
            const exerciseConfig = groupExercise.ExerciseConfigurations[i];
            exercisesGroup[groupExercise.day][exerciseConfig.order] = {
              idExercise: exerciseConfig.Exercise.idExercise,
              name: exerciseConfig.Exercise?.name,
              configuration: {
                series: exerciseConfig.series,
                repetitions: exerciseConfig.repetitions,
                weight: exerciseConfig.weight,
              },
              image1: exerciseConfig.Exercise.image1,
              image2: exerciseConfig.Exercise.image2,
            };
          }
        }
      });
      console.log(editRoutine, "editRoutine");
      const finalData = editRoutine && {
        name: editRoutine.name,
        startDate: moment.utc(editRoutine.startDate).format("YYYY-MM-DD"),
        endDate: moment.utc(editRoutine.endDate).format("YYYY-MM-DD"),
        exercisesGroup,
        objective: editRoutine.objective,
        observation: editRoutine.observation,
      };
      console.log(finalData, "finalData");
      setDurationInWeeks(
        moment(editRoutine.endDate).diff(moment(editRoutine.startDate), "weeks")
      );

      setFormData(finalData);
    }
  }, [exercises, rutinas, currentRoutineIndex]);

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const onDragOver = (event) => {
    allowDrop(event);
  };

  const startDrag = (event, exercise) => {
    event.dataTransfer.setData("exercise", JSON.stringify(exercise));
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && parseFloat(value) >= 0) {
      console.log(value);
      setDurationInWeeks(value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        endDate: moment(prevFormData.startDate).add(value, "weeks").format(),
      }));
      console.log(formData.startDate);
      console.log(formData.endDate);
    }
  };

  const handleRoutineNameChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    if (moment(dateString, "YYYY-MM-DD", true).isValid()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: dateString,

        endDate: moment(dateString).add(durationInWeeks, "weeks").format(),
      }));
    } else {
      // Manejar el caso de fecha no válida
      console.error("Fecha no válida:", dateString);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(
      updateRutine({
        ...formData,
        idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
      })
    );
  }

  const removeExercise = (day, exerciseIndex) => {
    setFormData((prevFormData) => {
      const newExercisesGroup = { ...prevFormData.exercisesGroup };
      delete newExercisesGroup[day][exerciseIndex];
      return {
        ...prevFormData,
        exercisesGroup: newExercisesGroup,
      };
    });
  };

  const onDrop = (event, day) => {
    event.preventDefault();
    const draggedExercise = JSON.parse(event.dataTransfer.getData("exercise"));

    const alreadyExists = Object.values(formData.exercisesGroup[day]).some(
      (exercise) => exercise.idExercise === draggedExercise.idExercise
    );

    if (!alreadyExists) {
      const exerciseDrop = {
        idExercise: draggedExercise.idExercise,
        name: draggedExercise.name,
        configuration: {
          series: 0,
          repetitions: 0,
          weight: 0,
        },
        image1: draggedExercise.image1,
        image2: draggedExercise.image2,
      };

      setFormData((prevFormData) => ({
        ...prevFormData,
        exercisesGroup: {
          ...prevFormData.exercisesGroup,
          [day]: {
            ...prevFormData.exercisesGroup[day],
            [draggedExercise.idExercise]: exerciseDrop,
          },
        },
      }));
    } else {
      alert("El ejercicio ya existe en este día");
    }
  };

  const handleSeries = (event, day, exerciseId) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [day]: {
          ...prevFormData.exercisesGroup[day],
          [exerciseId]: {
            ...prevFormData.exercisesGroup[day][exerciseId],
            configuration: {
              ...prevFormData.exercisesGroup[day][exerciseId].configuration,
              series: value,
            },
          },
        },
      },
    }));
  };

  const handleRepeticiones = (event, day, exerciseId) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [day]: {
          ...prevFormData.exercisesGroup[day],
          [exerciseId]: {
            ...prevFormData.exercisesGroup[day][exerciseId],
            configuration: {
              ...prevFormData.exercisesGroup[day][exerciseId].configuration,
              repetitions: value,
            },
          },
        },
      },
    }));
  };
  const handleWeight = (event, day, exerciseId) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      exercisesGroup: {
        ...prevFormData.exercisesGroup,
        [day]: {
          ...prevFormData.exercisesGroup[day],
          [exerciseId]: {
            ...prevFormData.exercisesGroup[day][exerciseId],
            configuration: {
              ...prevFormData.exercisesGroup[day][exerciseId].configuration,
              weight: value,
            },
          },
        },
      },
    }));
  };

  const handleLoadMore = () => {
    setVisibleExercises((prev) => prev + 10);
  };

  const handleDaySectionScroll = () => {
    setScrollHeight(daySectionRef.current.scrollTop);
  };

  const moveExercise = (day, currentIndex, newIndex) => {
    console.log(day, currentIndex, newIndex);
    console.log(typeof currentIndex, typeof newIndex);
    if (
      newIndex >= 0 &&
      newIndex < Object.keys(formData.exercisesGroup[day]).length
    ) {
      setFormData((prevFormData) => {
        const newExercisesGroup = { ...prevFormData.exercisesGroup };
        const exercises = Object.values(newExercisesGroup[day]);

        // Remove the exercise from its current position
        const [movedExercise] = exercises.splice(currentIndex, 1);

        // Insert the exercise at the new position
        exercises.splice(newIndex, 0, movedExercise);

        // Update the configuration index
        exercises.forEach((exercise, index) => {
          exercise.configuration = {
            ...exercise.configuration,
            index,
          };
        });

        // Update the exercises in the newExercisesGroup
        newExercisesGroup[day] = exercises.reduce((acc, exercise) => {
          acc[exercise.configuration.index] = exercise;
          return acc;
        }, {});

        return {
          ...prevFormData,
          exercisesGroup: newExercisesGroup,
        };
      });
    }
  };

  const handlePrevRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : rutinas.length - 1
    );
  };

  const handleNextRoutine = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex < rutinas.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (rutinas && rutinas.length === 0) {
    return (
      <Typography.Text>
        Este usuario aun no tiene ninguna rutina creada!
      </Typography.Text>
    );
  }

  return (
    <>
      {rutinas && rutinas?.length > 1 && (
        <LeftOutlined
          className="cursor-pointer text-2xl"
          onClick={handlePrevRoutine}
        />
      )}

      {rutinas && rutinas.length > 1 && (
        <RightOutlined
          className="cursor-pointer text-2xl"
          onClick={handleNextRoutine}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-full mx-auto p-6 flex flex-col formRutines"
      >
        <div id="addRutine" className="flex  flex-col">
          <div className="form-group my-2 mx-4">
            <input
              type="text"
              className="form-control max-w-xs m-2 border rounded-full"
              name="name"
              placeholder="Nombre de la rutina"
              value={formData.name}
              onChange={handleRoutineNameChange}
              required
            />
          </div>
          <div className="flex  justify-center py-2">
            <div className="form-group my-2 mx-4 flex flex-col">
              <label>Inicio:</label>
              <DatePicker
                onChange={handleDateChange}
                value={moment(formData.startDate)}
                defaultValue={startDate}
                format="YYYY-MM-DD"
                dropdownMode="top"
              />
            </div>
            <div className="form-group my-2 mx-4 flex flex-col">
              <label>Duración (en semanas):</label>
              <input
                type="number"
                className="form-control"
                onChange={handleDurationChange}
                value={durationInWeeks}
                required
              />
            </div>
          </div>
        </div>
        <h2 className="description-add-rutine bg-orange-200 text-black">
          Arrastrá los ejercicios al día que quieras
        </h2>
        {/* Parte izquierda (1/4 de ancho) */}
        <div className="flex mt-5">
          <div className="w-1/4 p-4 overflow-y-auto max-h-screen exercise-list text-orange-400">
            <h2 className="text-lg font-semibold mb-2">Lista de Ejercicios</h2>
            <div className="flex justify-center my-4">
              <input
                type="text"
                placeholder="Buscar ejercicios..."
                className="form-control p-2 border border-gray-300 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              {filteredExercises?.slice(0, visibleExercises).map((exercise) => (
                <div
                  key={exercise.idExercise}
                  className="mb-2 p-2 border border-gray-500 rounded-full cursor-move flex items-center ejercicio"
                  draggable
                  onDragStart={(evt) => startDrag(evt, exercise)}
                >
                  <div className="flex imgs-exercise-list">
                    <img
                      className="w-16 h-16 rounded-full mr-1 img1-exercise-list"
                      src={exercise.image1}
                      alt={exercise.name}
                    />
                    <img
                      className="w-16 h-16 rounded-full mr-2 img2-exercise-list"
                      src={exercise.image2}
                      alt={exercise.name}
                    />
                    <p className="text-orange-500">{exercise.name}</p>
                  </div>
                </div>
              ))}
            </div>
            {visibleExercises < filteredExercises?.length && (
              <button
                className="btn btn-primary mt-2 rounded-full"
                onClick={handleLoadMore}
              >
                Cargar más
              </button>
            )}
          </div>

          {/* Parte derecha (3/4 de ancho) */}
          <div
            className="flex-1 p-4 overflow-y-auto max-h-screen rutine-all-day"
            ref={daySectionRef}
            onScroll={handleDaySectionScroll}
          >
            {/* Tablas para cada día de la semana */}
            <div className="flex flex-wrap flex-col rutine-per-day">
              {/* Tablas para cada día de la semana */}
              {Object.entries(formData.exercisesGroup).map(
                ([day, exercises]) => (
                  <div
                    key={day}
                    className={`w-1/7 p-2 day-rutine`}
                    onDragOver={(evt) => onDragOver(evt)}
                    onDrop={(evt) => onDrop(evt, day)}
                  >
                    <div className="mb-2 p-2 border card-day border-gray-300  cursor-move">
                      <h3 className="text-lg text-customOrangeAdmin font-semibold mb-2">
                        {day}
                      </h3>
                      {Object.entries(exercises)?.map(([index, exercise]) => (
                        <div key={index} className="">
                          <div className="p-2">
                            <ul>
                              <li className="mb-2 card-drop rounded flex justify-between items-center bg-orange-200 exercise-in-day">
                                {exercise.image1 && (
                                  <div className="flex imgs-exercise-day">
                                    <img
                                      className="w-28 h-28 img1-exercise-day"
                                      src={exercise.image1}
                                      alt={exercise.name}
                                    />
                                    <img
                                      className="w-28 h-28 img2-exercise-day"
                                      src={exercise.image2}
                                      alt={exercise.name}
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="text-gray-800 text-card-drop">
                                    {exercise.name}
                                  </p>
                                  <div className="flex series-reps">
                                    <div className="form-group">
                                      <input
                                        type="number"
                                        className="form-control inputs border border-gray-300 rounded-full input-series-reps"
                                        name="series"
                                        placeholder="Series"
                                        inputMode="numeric"
                                        value={
                                          formData.exercisesGroup[day][index]
                                            ?.configuration?.series !==
                                          undefined
                                            ? formData.exercisesGroup[day][
                                                index
                                              ]?.configuration.series
                                            : ""
                                        }
                                        onChange={(e) =>
                                          handleSeries(e, day, index)
                                        }
                                      />
                                    </div>
                                    <div className="form-group ">
                                      <input
                                        className="form-control inputs border border-gray-300 rounded-full input-series-reps"
                                        name="repeticiones"
                                        placeholder="Repeticiones"
                                        value={
                                          formData.exercisesGroup[day][index]
                                            ?.configuration?.repetitions !==
                                          undefined
                                            ? formData.exercisesGroup[day][
                                                index
                                              ]?.configuration?.repetitions
                                            : ""
                                        }
                                        onChange={(e) =>
                                          handleRepeticiones(e, day, index)
                                        }
                                      />
                                    </div>
                                    <div className="form-group ">
                                      <input
                                        className="form-control inputs border border-gray-300 rounded-full input-series-reps"
                                        name="peso"
                                        placeholder="Peso(Kg)"
                                        value={
                                          formData.exercisesGroup[day][index]
                                            ?.configuration?.weight !==
                                          undefined
                                            ? formData.exercisesGroup[day][
                                                index
                                              ]?.configuration?.weight
                                            : ""
                                        }
                                        onChange={(e) =>
                                          handleWeight(e, day, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <MdArrowUpward
                                  className="text-red-500 w-10 h-10 cursor-pointer"
                                  onClick={() =>
                                    moveExercise(
                                      day,
                                      Number.parseInt(index),
                                      Number.parseInt(index) - 1
                                    )
                                  }
                                />
                                <MdArrowDownward
                                  className="text-red-500 w-10 h-10 cursor-pointer"
                                  onClick={() =>
                                    moveExercise(
                                      day,
                                      Number.parseInt(index),
                                      Number.parseInt(index) + 1
                                    )
                                  }
                                />
                                <MdDelete
                                  className="text-red-500 w-10 h-10 cursor-pointer"
                                  onClick={() => removeExercise(day, index)}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* Botón para guardar el workout */}
        <button
          type="submit"
          className="btn btn-primary my-4 mx-auto btn-save-rutine"
        >
          Guardar rutina
        </button>
      </form>
    </>
  );
}

export default EditarRutinas;
