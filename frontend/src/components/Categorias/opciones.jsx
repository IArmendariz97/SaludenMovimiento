import Typewriter from "typewriter-effect";

function Opciones() {
  return (
    <div style={{ fontSize: "32px", paddingTop: "20px" }}>
      <Typewriter
        options={{
          strings: [
            "FUNCIONAL",
            "ENTRENAMIENTO SEMIPERSONALIZADO",
            "PILATES TABATA",
          ],
          autoStart: true,
          loop: true,
          deleteSpeed: 60,
        }}
      />
    </div>
  );
}

export default Opciones;
