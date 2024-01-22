import { Spin } from "antd";

const LoadingSpinner = ({ title = "Cargando", size = "large" }) => {
  return (
    <div>
      <Spin size={size} />
      <div style={{ marginTop: 8 }}>{title}</div>
    </div>
  );
};

export default LoadingSpinner;
