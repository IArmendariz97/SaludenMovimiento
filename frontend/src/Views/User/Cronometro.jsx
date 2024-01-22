import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import "antd/dist/reset.css";
import "./Hoy.css";
function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    let intervalo;

    if (corriendo) {
      intervalo = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalo);
    };
  }, [corriendo]);

  const iniciarCronometro = () => {
    setCorriendo(true);
  };

  const detenerCronometro = () => {
    setCorriendo(false);
  };

  const reiniciarCronometro = () => {
    setSegundos(0);
    setCorriendo(false);
  };

  const formatearTiempo = (tiempo) => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;

    const minutosStr = minutos < 10 ? `0${minutos}` : `${minutos}`;
    const segundosStr = segundos < 10 ? `0${segundos}` : `${segundos}`;

    return `${minutosStr}:${segundosStr}`;
  };

  return (
    <Card
      className="cronometro"
      title="Cronómetro"
      style={{ textAlign: "center" }}
    >
      <div>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {formatearTiempo(segundos)}
        </p>
      </div>
      <div>
        {!corriendo ? (
          <Button type="primary" onClick={iniciarCronometro}>
            Iniciar
          </Button>
        ) : (
          <Button type="danger" onClick={detenerCronometro}>
            Detener
          </Button>
        )}
        <Button onClick={reiniciarCronometro}>Reiniciar</Button>
      </div>
    </Card>
  );
}

export default Cronometro;
