import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
Modal.setAppElement("#root");
// eslint-disable-next-line react/prop-types
const UserCalendar = ({ userId }) => {
  const [routines, setRoutines] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  // Simulación de datos de rutinas desde la base de datos
  useEffect(() => {
    const fetchedRoutines = [
      {
        id: 1,
        idClient: 1,
        startDate: "2023-10-25",
        endDate: "2023-11-30",
        exercises: [
          {
            id: 1,
            name: "Flexiones",
            description: "Hacer 3 series de 10 repeticiones",
            day: 1, // Lunes
          },
          {
            id: 2,
            name: "Sentadillas",
            description: "Hacer 3 series de 15 repeticiones",
            day: 3, // Miércoles
          },
          {
            id: 3,
            name: "Abdominales",
            description: "Hacer 3 series de 20 repeticiones",
            day: 5, // Viernes
          },
          {
            id: 4,
            name: "Fondos",
            description: "Hacer 3 series de 20 repeticiones",
            day: 5, // Viernes
          },
          {
            id: 5,
            name: "Peso Muerto",
            description: "Hacer 3 series de 20 repeticiones",
            day: 3, // Viernes
          },
          {
            id: 6,
            name: "Press de banca",
            description: "Hacer 3 series de 20 repeticiones",
            day: 1, // Viernes
          },
          {
            id: 7,
            name: "Remo con barra",
            description: "Hacer 3 series de 20 repeticiones",
            day: 3, // Viernes
          },
          {
            id: 8,
            name: "Salto de soga",
            description: "1 minuto",
            day: 1, // Viernes
          },
          {
            id: 9,
            name: "Abdominales",
            description: "Hacer 3 series de 20 repeticiones",
            day: 5, // Viernes
          },
          // Añade más ejercicios aquí
        ],
      },
      // Añade más rutinas aquí
    ];
    setRoutines(fetchedRoutines);

    const events = fetchedRoutines.reduce((acc, routine) => {
      return acc.concat(generateEvents(routine));
    }, []);
    setEvents(events);
  }, [userId]);

  const generateEvents = (routine) => {
    const { startDate, endDate, exercises } = routine;
    const events = [];

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    let currentDate = new Date(startDateObject);

    while (currentDate < endDateObject) {
      exercises.forEach((exercise) => {
        const dayOfWeek = currentDate.getDay(); // Domingo: 0, Lunes: 1, ..., Sábado: 6

        if (dayOfWeek === exercise.day) {
          events.push({
            title: exercise.name,
            start: currentDate.toISOString().split("T")[0],
            description: exercise.description,
            id: exercise.id, // Agrega el ID del ejercicio al objeto del evento
          });
        }
      });

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      );
    }

    return events;
  };

  return (
    <div className="w-full min-h-screen">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
        eventClick={(info) => {
          // Obtén el ID del evento haciendo clic

          const eventId = parseInt(info.event.id, 10);

          // Encuentra el ejercicio correspondiente en la lista de ejercicios
          let clickedExercise;
          for (let routine of routines) {
            clickedExercise = routine.exercises.find(
              (exercise) => exercise.id === eventId
            );
            if (clickedExercise) break;
          }

          setSelectedExercise(clickedExercise);

          setIsOpen(true);
        }}
      />

      {isOpen && selectedExercise && (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          {/* Otras informaciones relevantes del ejercicio */}
          <button className="mb-20" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
          <h2>{selectedExercise.title}</h2>
          <p>{selectedExercise.description}</p>
        </Modal>
      )}
    </div>
  );
};

export default UserCalendar;
