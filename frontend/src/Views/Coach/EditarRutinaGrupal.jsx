import EditarRutinas from "../../components/entrenadora/workoutComponents/editarRutinas";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroupRutines } from "../../features/group/groupSlice";
import LoadingSpinner from "../../shared/components/spinner/LoadingSpinner";
import { useState } from "react";
function EditarRutinasGrupal() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const token = state.auths.token;
  const rutinas = state.groups.rutinaGrupal;
  const { isLoading } = state.groups;
  const [dispatched, setDispatched] = useState(false);
  console.log(rutinas, "rutina grupal");
  useEffect(() => {
    if (dispatched === false) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getGroupRutines({ token, idGroup: id }));
        setDispatched(true);
      }
    }
  }, [rutinas]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <EditarRutinas rutinas={rutinas} />
    </div>
  );
}

export default EditarRutinasGrupal;
