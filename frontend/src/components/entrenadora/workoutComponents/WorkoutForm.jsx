import { useState, useEffect } from "react";
import WorkoutFormRadio from "./WorkoutFormRadio";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";

function WorkoutForm({ exercises, postWorkout }) {
  const initialState = {
    name: "",
    fechaDeInicio: "",
    fechaDeFin: "",
    exercises: [],
  };
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [chosenExercise, setChosenExercise] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [startDate, setStartDate] = useState(moment());
  const [durationInWeeks, setDurationInWeeks] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");

  const [exercisesByDay, setExercisesByDay] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const dayMapping = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const [exerciseTypes, setExerciseTypes] = useState([]);

  useEffect(() => {
    const types = [...new Set(exercises.map((exercise) => exercise.type))];
    setExerciseTypes(types);
  }, [exercises]);
  const handleDurationChange = (e) => {
    setDurationInWeeks(parseInt(e.target.value));
  };
  function handleDayChange(event) {
    setSelectedDay(event.target.value);
  }
  function populateFormOptions(exercises) {
    const filteredExercises = filterByType(exercises);

    return filteredExercises?.map((exercise) => (
      <option key={exercise.id} value={exercise.id}>
        {exercise.name}
      </option>
    ));
  }

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSeries(event) {
    setSeries(event.target.value);
  }
  function handleRepeticiones(event) {
    setRepeticiones(event.target.value);
  }

  function handleExerciseChange(event) {
    setChosenExercise(event.target.value);
  }

  function handleRadioChange(event) {
    if (event.target.checked) {
      setTypeFilter(event.target.value);
    }
  }
  const handleDateChange = (date, dateString) => {
    // dateString es la fecha en formato "YYYY-MM-DD"
    setStartDate(moment(dateString));
  };

  function addExerciseClick(event) {
    event.preventDefault();
    if (chosenExercise !== "" && selectedDay !== "") {
      const exerciseId = parseInt(chosenExercise, 10);
      const exercise = {
        "exercise-id": exerciseId,
        series: series,
        repeticiones: repeticiones,
      };
      setExercisesByDay((prevState) => ({
        ...prevState,
        [selectedDay]: [...(prevState[selectedDay] || []), exercise],
      }));
      setChosenExercise("");
      setSeries("");
      setRepeticiones("");
    }
  }

  function filterByType(exercises) {
    return exercises?.filter((exercise) => {
      if (typeFilter === "All") return true;
      return typeFilter === exercise.type;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formattedEndDate = moment(startDate)
      .add(durationInWeeks, "weeks")
      .format("YYYY-MM-DD");
    const updatedFormData = {
      name: formData.name,
      createdAt: moment(startDate).format("YYYY-MM-DD"),
      expiredAt: formattedEndDate,
      exerciseGroups: Object.entries(exercisesByDay)
        .map(([day, exercises]) => {
          return {
            day: dayMapping[day],
            exercises: exercises.map((exercise) => ({
              id: exercise["exercise-id"],
              name: exercise.name,
              series: exercise.series,
              repeticiones: exercise.repeticiones,
            })),
          };
        })
        .filter((group) => group !== null),
    };
    postWorkout([updatedFormData], id);
    setFormData(initialState);
  }
  function removeExercise(day, exerciseIndex) {
    const updatedExercises = exercisesByDay[day].filter(
      (_, index) => index !== exerciseIndex
    );
    setExercisesByDay({
      ...exercisesByDay,
      [day]: updatedExercises,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded shadow-md "
    >
      <div className="form-group my-2 mx-4">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Nombre de la rutina"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex  justify-center py-2">
        <div className="form-group my-2 mx-4 flex flex-col">
          <label>Inicio:</label>
          <DatePicker
            onChange={handleDateChange}
            defaultValue={moment(startDate, "YYYY-MM-DD")}
            format="YYYY-MM-DD"
            dropdownMode="top"
          />
        </div>
        <div className="form-group my-2 mx-4 flex flex-col">
          <label>Semanas:</label>
          <input
            type="number"
            className="form-control"
            onChange={handleDurationChange}
            value={durationInWeeks}
            required
          />
        </div>
      </div>
      <div className="form-group my-2 mx-4">
        <WorkoutFormRadio handleRadioChange={handleRadioChange} />
        <select
          className="form-select p-2 rounded-lg"
          onChange={handleExerciseChange}
          name="type"
          value={chosenExercise}
        >
          <option value="">Seleccionar ejercicio</option>
          {populateFormOptions(exercises)}
        </select>
        <div className="form-group my-2 mx-4">
          <input
            type="number"
            className="form-control"
            name="series"
            placeholder="Series"
            inputMode="numeric"
            value={series}
            onChange={handleSeries}
          />
        </div>
        <div className="form-group my-2 mx-4">
          <input
            type="number"
            className="form-control"
            name="repeticiones"
            placeholder="Repeticiones"
            inputMode="numeric"
            value={repeticiones}
            onChange={handleRepeticiones}
          />
        </div>
        <div className="form-group my-2 mx-4">
          <label>Select Day:</label>
          <select
            className="form-select"
            onChange={handleDayChange}
            name="day"
            value={selectedDay}
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <button
          className="btn btn-secondary my-2 mx-4"
          onClick={addExerciseClick}
        >
          Add Exercise
        </button>
      </div>

      <button type="submit" className="btn btn-primary my-1 mx-5">
        Save Workout
      </button>
      <div className="container">
        {Object.entries(exercisesByDay).map(([day, exercises]) => (
          <div
            key={day}
            className={`${exercises.length > 0 ? "block" : "hidden"} my-4`}
          >
            <div className="bg-gray-100 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">{day}</h3>
              <ul>
                {exercises.map((exercise, index) => (
                  <li
                    key={index}
                    className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800">
                        Ejercicio ID: {exercise["exercise-id"]}
                      </p>
                      <p className="text-gray-800">Series: {exercise.series}</p>
                      <p className="text-gray-800">
                        Repeticiones: {exercise.repeticiones}
                      </p>
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => removeExercise(day, index)}
                    >
                      &#10006;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}

export default WorkoutForm;
