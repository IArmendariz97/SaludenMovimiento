import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Sedes.module.css";

export const AnyReactComponent = () => (
  <div>
    <FaMapMarkerAlt className="h-8 w-8 text-red-500" />
  </div>
);

AnyReactComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

// eslint-disable-next-line react/prop-types
export default function SimpleMap({ center, children }) {
  const defaultProps = {
    center: center,
    zoom: 17,
  };

  return (
    <div
      style={{ height: "30vh", width: "550px" }}
      className={`m-12 ${styles.mapa}`}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCMoTEepJRZ2GBDkmK5RGN3pbH-BK3z8Go",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
}
