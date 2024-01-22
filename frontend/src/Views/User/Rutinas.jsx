import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";
import Calendar from "../../Views/Coach/SingleUser/Calendar";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRutines } from "../../features/rutinas/rutinasSlice";
import { getUser } from "../../features/user/userSlice";
import { getGroupRutines } from "../../features/group/groupSlice";
import "./Hoy.css";
function Rutinas() {
  const dispatch = useDispatch();
  const localUser = JSON.parse(localStorage.getItem("User"));
  const token = localUser.token;
  const users = useSelector((state) => state.users);
  const groups = useSelector((state) => state.groups);
  const rutinasSlice = useSelector((state) => state.rutinas);
  const auths = useSelector((state) => state.auths);
  const { user } = users;
  const authUser = auths.user;
  const { rutinaGrupal } = groups;
  const { isLoading, rutinas } = rutinasSlice;
  const [dispatched1, setDispatched] = useState(false);
  const [dispatched2, setDispatched2] = useState(false);
  useEffect(() => {
    dispatch(getUser({ token, userId: authUser.idUser }));
    if (
      user &&
      user.Client &&
      user.Client.ClientGroups &&
      user.Client.ClientGroups.length > 0
    ) {
      const idGroup = user?.Client?.ClientGroups[0]?.idGroup;
      if (dispatched1 === false) {
        if (!rutinaGrupal || rutinaGrupal.length === 0) {
          dispatch(getGroupRutines({ token, idGroup }));
          setDispatched(true);
        }
      }
    }
    if (dispatched2 === false) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(authUser.idUser));
        setDispatched2(true);
      }
    }
  }, [rutinas, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="rutinas">
      {rutinas && rutinas.length > 0 && <Calendar rutinas={rutinas} />}
      {rutinaGrupal && rutinaGrupal.length > 0 && (
        <Calendar rutinas={rutinaGrupal} />
      )}
    </div>
  );
}

export default Rutinas;
