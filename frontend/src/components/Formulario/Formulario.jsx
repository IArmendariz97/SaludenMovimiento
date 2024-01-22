import Form from "./Form";
import styles from "./Form.module.css";

function Formulario() {
  return (
    <div className={`flex mb-16 ${styles.todo}`}>
      <div className={`flex-1 ${styles.form}`}>
        <Form />
      </div>
      <div className={`${styles.img3} flex-1 flex items-center justify-center`}>
        <img
          src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/imgDerecha3.webp"
          alt="tercerImagen"
          className={`w-2/6 `}
        />
      </div>
    </div>
  );
}

export default Formulario;
