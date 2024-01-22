import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./Views/Home/Home";
import Coach from "./Views/Coach/Coach";
import Noticias from "./Views/Foro/Noticias";

import Grupos from "./Views/Coach/Grupos";
import Profile from "./Views/User/SingleUser/Profile";

import SingleUser from "./Views/Coach/SingleUser/SingleUser";
import User from "./Views/User/User";
import Cronometro from "./Views/User/Cronometro";
import Workout from "./components/entrenadora/workoutComponents/Workout";
import WorkoutContainer from "./components/entrenadora/workoutComponents/WorkoutContainer";
import WorkoutCreator from "./components/entrenadora/workoutComponents/WorkoutCreator.jsx";

import UserCalendar from "./Views/Coach/UserCalendar";

import GroupCalendar from "./Views/Coach/GruposCalendar";
import AgregarEjercicio from "./components/entrenadora/workoutComponents/agregarEjercicio.jsx";
import Hoy from "./Views/User/Hoy";
import CrearGrupos from "./Views/Coach/CrearGrupos";
import EditarRutinasIndividual from "./Views/Coach/EditarRutina";
import EditarRutinasGrupal from "./Views/Coach/EditarRutinaGrupal";
import ChangePassword from "./Views/Coach/ChangePassword/ChangePassword.jsx";
import Rutinas from "./Views/User/Rutinas";
import UserList from "./Views/Coach/UserList";
import ClientList from "./Views/Coach/ClientList";
import { useSelector } from "react-redux";
import EditarEjercicio from "./components/entrenadora/workoutComponents/editarEjercicio.jsx";

const Router = () => {
  //@TODO: Arreglar idioma de las rutas. O español o ingles.
  const auth = useSelector((state) => state.auths);

  return (
    <BrowserRouter>
      <Routes>
        {/* outside */}
        <Route exact path="/" element={<Home />} />
        {/* inside COACH */}
        <Route
          path="/coach/*"
          element={auth.token !== "" ? <Coach /> : <Navigate to="/" />}
        >
          <Route index element={<Noticias />} />
          <Route path="user/:id" element={<SingleUser />}>
            <Route path="ejercicios" element={<UserCalendar />} />
            <Route path="hoy" element={<WorkoutContainer />} />
            <Route path="agregarRutina" element={<WorkoutCreator />} />
            <Route path="editarRutinas" element={<EditarRutinasIndividual />} />
            <Route path="workouts/:id" element={<Workout />} />
          </Route>
          <Route path="agregarEjercicios" element={<AgregarEjercicio />} />
          <Route path="editarEjercicio" element={<EditarEjercicio />} />
          <Route path="listaDeUsuarios" element={<UserList />} />
          <Route path="listaDeClientes" element={<ClientList />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="grupos/:id" element={<SingleUser />}>
            <Route path="ejercicios" element={<GroupCalendar />} />
            <Route path="agregarRutina" element={<WorkoutCreator />} />
            <Route path="editarRutinas" element={<EditarRutinasGrupal />} />
          </Route>
          <Route path="creargrupos" element={<CrearGrupos />} />

          <Route path="changePassword/:id" element={<ChangePassword />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route
          path="/user/:id"
          element={auth.token !== "" ? <User /> : <Navigate to="/" />}
        >
          <Route path="profile/:id" element={<Profile />} />
          <Route index element={<Noticias />} />
          <Route path="hoy" element={<Hoy />} />
          <Route path="rutinas" element={<Rutinas />} />
          <Route path="cronometro" element={<Cronometro />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
