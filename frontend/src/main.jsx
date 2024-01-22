import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalProvider } from "./context/globalContext";
import { store, persistor } from "./store/store";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "tailwindcss/tailwind.css";
import LoadingSpinner from "@/shared/components/spinner/LoadingSpinner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
      <App />
      <PersistGate
        loading={<LoadingSpinner />}
        persistor={persistor}
      ></PersistGate>
    </GlobalProvider>
  </Provider>
);
reportWebVitals();
