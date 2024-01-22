/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ExerciseModal from "../../../components/entrenadora/exerciseComponents/ExerciseModal";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import { Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import esLocale from "@fullcalendar/core/locales/es";
import { useDispatch } from "react-redux";
import { updateRutineConfiguration } from "../../../features/rutinas/rutinasSlice";
import { showSuccessNotification } from "../../../features/layout/layoutSlice";

function Calendar({ rutinas }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const rutinasSlice = useSelector((state) => state.rutinas);
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);

  const { isSuccess } = rutinasSlice;
  const [events, setEvents] = useState([]);
  const [currentDateModal, setCurrentDate] = useState();

  useEffect(() => {
    if (rutinas && rutinas.length !== 0) {
      const generatedEvents = generateEvents(rutinas[currentRoutineIndex]);

      setEvents(generatedEvents);
    }
  }, [rutinas, currentRoutineIndex]);

  function handleCardClick({ exerciseConfiguration, currentDate }) {
    const exercise = exerciseConfiguration;
    setSelectedExercise(exercise);
    setShowModal(true);
    setCurrentDate(currentDate);
  }
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
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
    ];
    return daysOfWeek[dayOfWeek];
  };
  const handleEditExercise = (formData) => {
    const configuration = formData;
    const exerciseId = formData.exerciseId;
    const fecha = new Date(currentDateModal);
    fecha.setDate(fecha.getDate() + 1);
    const opcionesDiaSemana = { weekday: "long" };
    const diaSemana = new Intl.DateTimeFormat(
      "es-ES",
      opcionesDiaSemana
    ).format(fecha);
    let diaSemanaCapitalizado =
      diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
    if (diaSemanaCapitalizado === "Miércoles") {
      diaSemanaCapitalizado = "Miercoles";
    }
    dispatch(
      updateRutineConfiguration({
        configuration,
        exerciseId,
        day: diaSemanaCapitalizado,
        idRoutine: rutinas[currentRoutineIndex].routine.idRoutine,
      })
    );
    if (isSuccess) {
      dispatch(showSuccessNotification("Exito", "Ejercicio editado"));
      setShowModal(false);
      window.location.reload();
    }
  };
  function generateEvents(rutinas) {
    const events = [];

    const { startDate, endDate, GroupExercises } = rutinas.routine;
    let currentDate = new Date(startDate);
    const endDateObject = new Date(endDate);

    let i = 0;
    while (currentDate < endDateObject) {
      const dayOfWeek = currentDate.getUTCDay();
      const dayOfWeekString = getDayOfWeekString(dayOfWeek);

      GroupExercises.forEach((groupExercise) => {
        const configDay = groupExercise.day.toLowerCase();
        if (dayOfWeekString === configDay) {
          groupExercise.ExerciseConfigurations.forEach(
            (exerciseConfiguration) => {
              events.push({
                id: i++,
                start: currentDate.toISOString().split("T")[0],
                description: exerciseConfiguration.Exercise.description,
                idExercise: exerciseConfiguration.idExercise,
                extendedProps: {
                  exerciseConfiguration: exerciseConfiguration,
                  currentDate: new Date(currentDate)
                    .toISOString()
                    .split("T")[0],
                },
              });
            }
          );
        }
      });

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return events;
  }

  if (rutinas && rutinas.length === 0) {
    return (
      <div>
        <Typography.Text className="text-xl">
          Este usuario aun no posee ninguna rutina!
        </Typography.Text>
      </div>
    );
  }

  return (
    <div className="user-calendar">
      <div className="flex items-center justify-between mt-10">
        {rutinas && rutinas.length > 1 && (
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
      </div>
      {events && rutinas && rutinas.length !== 0 && (
        <div key={currentRoutineIndex} className="w-full ">
          <h2 className="rutineTittle text-orange-500">
            {rutinas[currentRoutineIndex]?.routine?.name}
          </h2>
          <FullCalendar
            key={events.length}
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={events}
            locales={[esLocale]} // Agrega la configuración del idioma español
            locale="es"
            firstDay={1}
            fixedWeekCount={false}
            eventContent={(arg) => {
              const exerciseConfiguration =
                arg.event.extendedProps.exerciseConfiguration;
              const currentDate = arg.event.extendedProps.currentDate;
              return (
                <div
                  className="card-calendar "
                  onClick={() =>
                    handleCardClick({ exerciseConfiguration, currentDate })
                  }
                >
                  <div className="card-body flex flex-col ">
                    <div className="flex flex-col  gap-1 border-black">
                      <div className="flex gap-2">
                        <div className="flex">
                          <img
                            src={exerciseConfiguration.Exercise.image1}
                            alt="image1"
                            className="img1-calendar"
                          />
                          <img
                            src={exerciseConfiguration.Exercise.image2}
                            alt="image1"
                            className="img2-calendar"
                          />
                        </div>
                        <div>
                          <h5 className="card-title">
                            {exerciseConfiguration.Exercise.name}
                          </h5>
                          <div className="card-body">
                            <h5 className="card-title text-center">
                              {exerciseConfiguration.series}x
                              {exerciseConfiguration.repetitions}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek",
            }}
            hiddenDays={[0]}
            height="80vh"
            contentHeight="auto"
          />
        </div>
      )}
      {showModal ? (
        <ExerciseModal
          exercise={selectedExercise}
          closeModal={() => setShowModal(false)}
          handleEditExercise={handleEditExercise}
        />
      ) : null}
    </div>
  );
}

export default Calendar;
