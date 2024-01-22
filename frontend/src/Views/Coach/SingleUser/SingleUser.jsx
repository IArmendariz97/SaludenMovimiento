import User from "./User";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetRutines } from "../../../features/rutinas/rutinasSlice";
import Group from "./Group";

const SingleUser = () => {
  const activeStyle = {
    fontWeight: "bold",
    color: "orange",
    fontSize: "1.7rem",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isExerciseRoute = location.pathname.endsWith("/ejercicios");
  const isRoutineRoute = location.pathname.endsWith("/agregarRutina");
  const isAddExerciseRoute = location.pathname.endsWith("/agregarEjercicio");
  const isModRoute = location.pathname.endsWith("/editarRutinas");
  const isGroupsPage = location.pathname.includes("/grupos");

  const isUserRoute = () => {
    if (
      !isExerciseRoute &&
      !isRoutineRoute &&
      !isAddExerciseRoute &&
      !isModRoute
    ) {
      return true;
    }
    return false;
  };

  const resetRutinasAndNavigate = (to) => {
    dispatch(resetRutines());
    navigate(to);
  };

  return (
    <div>
      <nav className="row navbar mx-1 border-t-2 mb-3 ">
        <ul className="flex gap-3 justify-center content-center mt-2 header-clientt">
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500 btn-header-client">
            <NavLink
              to="./"
              style={activeStyle}
              className="link-header-client"
              onClick={() => resetRutinasAndNavigate("./")}
            >
              {isGroupsPage ? "Grupo" : "Usuario"}
            </NavLink>
          </li>
          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500 btn-header-client">
            <NavLink
              to="./ejercicios"
              className="link-header-client"
              style={activeStyle}
              onClick={() => resetRutinasAndNavigate("./")}
            >
              Ejercicios
            </NavLink>
          </li>

          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500 btn-header-client">
            <NavLink
              to="./agregarRutina"
              className="link-header-client"
              style={activeStyle}
              onClick={() => resetRutinasAndNavigate("./")}
            >
              Agregar rutina
            </NavLink>
          </li>

          <li className="border-slate-500 border-2 p-3 rounded-lg hover:bg-slate-500 btn-header-client">
            <NavLink
              to="./editarRutinas"
              className="link-header-client"
              style={activeStyle}
              onClick={() => resetRutinasAndNavigate("./")}
            >
              Editar rutina
            </NavLink>
          </li>
        </ul>
      </nav>
      {isUserRoute() ? isGroupsPage ? <Group /> : <User /> : null}
      <Outlet />
    </div>
  );
};

export default SingleUser;
