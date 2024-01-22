import { useContext, useState, useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  clearUserMessage,
  register,
  loginUser,
} from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";

import AvatarOptions from "./AvatarOptions";
import { initialState } from "stream-chat-react/dist/components/Channel/channelState";
import { getUsers, getCoaches } from "../features/user/userSlice";

const credentialsInitialState = {
  password: "",
  name: "",
  lastname: "",
  email: "",
  repeatPassword: "",
  avatar: "",
};

function Register({ isRegisterOpen, setRegisterOpen }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useDispatch();
  const auths = useSelector((state) => state.auths);
  const users = useSelector((state) => state.users);

  const { message, token, user, userId, isLoading } = auths;
  const { coaches } = users;
  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { setLogged } = globalContext;
  const [credentials, setCredentials] = useState(credentialsInitialState);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelectAvatar = (selectedAvatar) => {
    setCredentials({
      ...credentials,
      avatar: selectedAvatar,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (isRegisterOpen) {
      const newErrors = {};
      if (!credentials.avatar) newErrors.avatar = "Seleccione un avatar";
      if (!credentials.password) newErrors.password = "Ingrese una contraseña";
      if (!credentials.repeatPassword)
        newErrors.repeatPassword = "Repita la contraseña";
      if (!credentials.name) newErrors.name = "Ingrese su nombre";
      if (!credentials.lastname) newErrors.lastname = "Ingrese su apellido";
      if (!credentials.email) newErrors.email = "Ingrese su correo electrónico";
      if (credentials.password !== credentials.repeatPassword)
        newErrors.repeatPassword = "Las contraseñas no coinciden";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      dispatch(register(credentials));
    } else {
      dispatch(loginUser(credentials));
    }
    setErrors({});
    setGeneralError("");
    setCredentials(initialState);
  }

  const repeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    setRegisterOpen(!isRegisterOpen);
    setCredentials(initialState);
    setErrors({});
  };

  useEffect(() => {
    // LOGIN MANUALLY RESPONSE
    if (message === "User registered successfully") {
      dispatch(
        showSuccessNotification(
          "Bienvenido",
          "Es un gusto tenerte con nosotros!"
        )
      );
      setTimeout(() => {
        dispatch(clearUserMessage());
        // Clear message state & close Login modal
        setRegisterOpen(false);
        setCredentials(initialState);
        setErrors({});
      }, 2100);
    }

    if (message === "Email Incorrect" || message === "Password Incorrect") {
      dispatch(
        showErrorNotification(
          "Error",
          "El email o la contraseña son incorrectos"
        )
      );
      dispatch(clearUserMessage());
    }

    if (message === "User already exists") {
      dispatch(
        showErrorNotification(
          "Error",
          "Ya existe un usuario creado con esas credenciales. Por favor, inicie sesión."
        )
      );
      dispatch(clearUserMessage());
    }

    if (message === "User logged") {
      // Setear LS con userID encriptado

      if (token && userId) {
        localStorage.setItem(
          "User",
          JSON.stringify({ user: userId, token: token })
        );
        console.log(token, "token");
        dispatch(getCoaches(token));
        dispatch(getUsers(token));
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.userId,
      });

      dispatch(showSuccessNotification("Hola", `Bienvenido de vuelta!`));
      const isUserACoach = coaches?.some((coach) => coach.idUser === userId);

      //@TODO: Aca debo redirigir a donde sea. Si es usuario va a ser a /user. Si es coach va a ser a /coach.
      if (isUserACoach) {
        setTimeout(() => {
          navigate("/coach");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/coach");
        }, 1000);
      }
    }
  }, [message, user, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <div>
        <div className="bg-white px-3 w-full internal-modal-login">
          {isRegisterOpen ? (
            <div className="flex flex-col md:flex-row ">
              <div className="mb-4 md:mb-0 md:w-1/2">
                <div>
                  <input
                    type="text"
                    id="form3Example1m"
                    name="name"
                    onChange={handleCredentials}
                    value={credentials.name}
                    className={`form-control w-full px-3 border border-gray-300 rounded ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  <label className="text-gray-700" htmlFor="form3Example1m">
                    Nombre
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="md:w-1/2">
                <div>
                  <input
                    type="text"
                    id="form3Example1n"
                    name="lastname"
                    onChange={handleCredentials}
                    value={credentials.lastname}
                    className={`form-control w-full px-3 border border-gray-300 rounded overflow-y-scroll ${
                      errors.lastname ? "border-red-500" : ""
                    }`}
                  />
                  <label className="text-gray-700" htmlFor="form3Example1n">
                    Apellido
                  </label>
                  {errors.lastname && (
                    <p className="text-red-500 text-sm">{errors.lastname}</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          <div className="mb-2">
            <input
              type="text"
              name="email"
              onChange={handleCredentials}
              value={credentials.email}
              id="email"
              className={`form-control w-full px-3 border border-gray-300 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            <label className="text-gray-700" htmlFor="email">
              Correo electrónico
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <div className="mb-2 ">
              <div className="relative">
                <input
                  name="password"
                  onChange={handleCredentials}
                  value={credentials.password}
                  type={showPassword ? "text" : "password"}
                  className={`form-control w-full px-3 py-2 border border-gray-300 rounded ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <label className="text-gray-700" htmlFor="form3Example4c">
                  Contraseña
                </label>
                {showPassword ? (
                  <MdVisibilityOff
                    className="password-icon"
                    onClick={passwordVisibility}
                  />
                ) : (
                  <MdVisibility
                    className="password-icon"
                    onClick={passwordVisibility}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            {isRegisterOpen ? (
              <div className="mb-4 ">
                <div className="relative">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    id="password-input"
                    name="repeatPassword"
                    onChange={handleCredentials}
                    value={credentials.repeatPassword}
                    className={`form-control w-full px-3 py-2 border border-gray-300 rounded ${
                      errors.repeatPassword ? "border-red-500" : ""
                    }`}
                  />
                  <label className="text-gray-700" htmlFor="form3Example4cd">
                    Repita su contraseña
                  </label>
                  {showRepeatPassword ? (
                    <MdVisibilityOff
                      className="password-icon"
                      onClick={repeatPasswordVisibility}
                    />
                  ) : (
                    <MdVisibility
                      className="password-icon"
                      onClick={repeatPasswordVisibility}
                    />
                  )}
                </div>
                {errors.repeatPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.repeatPassword}
                  </p>
                )}
                <div className="">
                  <AvatarOptions onSelectAvatar={handleSelectAvatar} />
                  {errors.avatar && (
                    <p className="text-red-500 text-sm">{errors.avatar}</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex justify-center ">
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-500 hover:bg-black font-bold px-4 rounded"
            >
              ENVIAR
            </button>
            <div>
              {generalError && (
                <p className="text-red-500 text-sm">{generalError}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleRegister}
            type="button"
            className="font-bold rounded mt-2 hover:text-orange-700 border-none text-orange-500"
          >
            {isRegisterOpen
              ? "CAMBIAR A INICIAR SESIÓN"
              : "CAMBIAR A CREAR CUENTA"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
