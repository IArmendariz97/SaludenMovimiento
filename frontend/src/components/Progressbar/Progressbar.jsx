import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Progressbar.module.css";

const Progressbar = ({ percentage }) => {
  console.log(percentage, "[ercentage");
  return (
    <div
      className="percentage-circle-container"
      style={{ width: 200, height: 200 }}
    >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: "6px",
          pathColor: `#2ecc71`, // Color del progreso
          textColor: "#6b778c", // Color del texto
          trailColor: "#ecedf0", // Color de fondo
        })}
      />
    </div>
  );
};

export default Progressbar;
