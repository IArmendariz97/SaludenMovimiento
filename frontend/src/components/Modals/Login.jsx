import { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import {
  clearUserMessage,
  googleLoginSlice,
  loginUser,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";

import {
  showSuccessNotification,
  showErrorNotification,
} from "@/features/layout/layoutSlice";

const credentialsInitialState = {
  credential: "",
  password: "",
};

const LoginModalN = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { message: userMessage, user } = state.user;

  // CONTEXT API
  const globalContext = useContext(GlobalContext);
  const { showLoginModal, setShowLoginModal, setLogged } = globalContext;

  // CREDENTIALS STATE & HANDLE
  const [credentials, setCredentials] = useState(credentialsInitialState);
  const handleCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // MANUAL LOGIN
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  // GOOGLE LOGIN
  const [token, setToken] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
  });

  useEffect(() => {
    // FOR GOOGLE LOGIN
    (async () => {
      if (token) {
        const getData = await axios(
          "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,genders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        // PETITION TO GOOGLE AUTH CONTROLLER IN THE BACK

        dispatch(
          googleLoginSlice({
            email: getData.data.emailAddresses[0].value,
            userName: getData.data.names[0].givenName,
            firstName: getData.data.names[0].givenName,
            lastName: getData.data.names[0].familyName,
          })
        );
      }
    })();
  }, [token]);

  useEffect(() => {
    if (userMessage === "User logged") {
      // Setear LS con userID encriptado
      if (user && user.encodedId) {
        localStorage.setItem(
          "nerdyUser",
          JSON.stringify({ userId: user.encodedId })
        );
      }

      // setLogged to allow functionalities
      setLogged({
        userId: user.encodedId,
      });

      dispatch(
        showSuccessNotification(
          "Hola",
          `Bienvenido de vuelta ${user?.userName}!`
        )
      );

      navigate("/home");
    } else {
      dispatch(
        showErrorNotification(
          "Error",
          "El email o la contraseña son incorrectos"
        )
      );
      dispatch(clearUserMessage());
    }
  }, [userMessage, user]);

  return (
    <article
      id="menuToggleRegister"
      className={`${styles.article} loginModalUtil menuToggleRegister`}
      style={{ right: showLoginModal ? "0" : "-1500px" }}
    >
      <div className={styles.div}>
        <div className={`${styles.article} menuToggleRegister`}>
          {/* LOGIN */}
          <div className={styles.login}>
            <div className="d-flex align-items-end justify-content-end w-100">
              <div className={styles.close}>
                <i
                  className="bx bx-x"
                  onClick={() => setShowLoginModal(false)}
                ></i>
              </div>
            </div>
            {/* Login Options */}
            <div className={styles.loginOptions}>
              {/* Manual Login */}
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.loginInput}>
                  <span>
                    <label>Correo Electronico</label>
                  </span>
                  <input
                    type="text"
                    name="credential"
                    onChange={handleCredentials}
                    value={credentials.credential}
                  />
                </div>
                <div className={`${styles.loginInput} mt-3`}>
                  <span>
                    <label>Contraseña</label>
                  </span>
                  <input
                    type="password"
                    name="password"
                    onChange={handleCredentials}
                    value={credentials.password}
                  />
                </div>

                <span className={styles.forgotPassword}>
                  <label>Olvidaste tu contraseña?</label>
                </span>

                <button type="submit" className={styles.loginButton}>
                  <label>Ingresar</label>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LoginModalN;
