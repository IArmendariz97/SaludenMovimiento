import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExercises,
  updateExercise,
} from "../../../features/exercises/exerciseSlice";
import { Input, Modal, Typography } from "antd";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import { Link } from "react-router-dom";

function EditarEjercicio() {
  const dispatch = useDispatch();
  const { exercises, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.exercises
  );

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleExercises, setVisibleExercises] = useState(20);

  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExercises());
    }

    if (message === "Ejercicio actualizado correctamente") {
      dispatch(showSuccessNotification("Edición exitosa", message));
    }

    if (isError) {
      dispatch(showErrorNotification("Error", message));
    }
  }, [exercises, message]);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleSave = () => {
    if (selectedExercise) {
      dispatch(updateExercise(selectedExercise));
      setSelectedExercise(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Reiniciamos la lista visible cuando cambia el término de búsqueda
    setVisibleExercises(20);
  };

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleExercises((prev) => prev + 20);
  };

  if (isError) {
    return <div>Error: {message}</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isSuccess && exercises && exercises.length === 0) {
    return (
      <div>
        <Typography.Title level={2}>
          Aún no hay ejercicios creados, pruebe creando el{" "}
          <Link to="../agregarEjercicios">primer ejercicio!</Link>
        </Typography.Title>
      </div>
    );
  }

  return (
    <>
      {exercises && (
        <div className="edit-exercise p-10">
          <Typography.Title level={2}>Editar Ejercicio</Typography.Title>
          <div>
            <div>
              <Input
                type="text"
                placeholder="Buscar ejercicios..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises?.slice(0, visibleExercises).map((exercise) => (
                <li
                  key={exercise?.idExercise}
                  onClick={() => handleExerciseSelect(exercise)}
                  className="border border-gray-300 p-4 rounded cursor-pointer transition transform hover:scale-105"
                >
                  <div className="mb-2 font-bold">
                    <Typography.Text>
                      ID: {exercise?.idExercise}
                    </Typography.Text>
                  </div>
                  <div className="mb-2">
                    <Typography.Text>{exercise?.name}</Typography.Text>
                  </div>
                  <div className="flex gap-4 justify-center">
                    {exercise?.image1 && (
                      <img
                        src={exercise?.image1}
                        alt={`Imagen de ${exercise?.name}`}
                        className="w-32 h-32 object-cover mb-2 rounded-full"
                      />
                    )}
                    {exercise?.image2 && (
                      <img
                        src={exercise?.image2}
                        alt={`Imagen de ${exercise?.name}`}
                        className="w-32 h-32 object-cover mb-2 rounded-full"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {filteredExercises?.length > visibleExercises && (
              <button onClick={handleLoadMore} className="mt-4 p-2 rounded">
                Cargar más
              </button>
            )}
          </div>
          {selectedExercise && (
            <Modal
              title="Detalles del Ejercicio"
              open={Boolean(selectedExercise !== null)}
              onOk={handleSave}
              onCancel={() => setSelectedExercise(null)}
            >
              <div className="">
                <div className="">
                  <div>
                    <label>Nombre:</label>
                    <Input
                      type="text"
                      value={selectedExercise.name || ""}
                      onChange={(e) =>
                        setSelectedExercise({
                          ...selectedExercise,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Descripción:</label>
                    <Input
                      type="text"
                      value={selectedExercise.description || ""}
                      onChange={(e) =>
                        setSelectedExercise({
                          ...selectedExercise,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Video:</label>
                    <Input
                      type="text"
                      value={selectedExercise.video || ""}
                      onChange={(e) =>
                        setSelectedExercise({
                          ...selectedExercise,
                          video: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Imagen 1:</label>
                    <Input
                      type="text"
                      value={selectedExercise.image1 || ""}
                      onChange={(e) =>
                        setSelectedExercise({
                          ...selectedExercise,
                          image1: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Imagen 2:</label>
                    <Input
                      type="text"
                      value={selectedExercise.image2 || ""}
                      onChange={(e) =>
                        setSelectedExercise({
                          ...selectedExercise,
                          image2: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
}

export default EditarEjercicio;
