import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  // MODALS LOGIN, CART
  const [showLoginModal, setShowLoginModal] = useState(false);

  // LOGIN & LANGUAGE
  const [logged, setLogged] = useState(false);

  const data = {
    logged,
    setLogged,
    showLoginModal,
    setShowLoginModal,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
