import EditarRutinas from "../../components/entrenadora/workoutComponents/editarRutinas";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import LoadingSpinner from "../../shared/components/spinner/LoadingSpinner";
import { useState } from "react";
function EditarRutinasIndividual() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const { rutinas, isLoading } = state.rutinas;
  const [dispatched, setDispatched] = useState(false);
  console.log(rutinas, "rutina individual");
  useEffect(() => {
    if (dispatched === false) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(id));
        setDispatched(true);
      }
    }
  }, [rutinas, id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <EditarRutinas rutinas={rutinas} />
    </div>
  );
}

export default EditarRutinasIndividual;
