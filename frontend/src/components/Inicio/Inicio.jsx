import primerimg from "../../assets/primerimg.webp";
import { Link } from "react-scroll";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./Inicio.module.css";

const Inicio = () => {
  const imgBgStyle = {
    position: "absolute",
    left: "100%",
  };
  const HeaderHeight = 112;
  return (
    <div
      className={`relative overflow-x-hidden overflow-y-hidden ${styles.p10}`}
    >
      <img
        className={`${styles.img1} absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 img1`}
        src="https://media-public.canva.com/mn-RI/MAEL5Bmn-RI/3/s.svg"
        alt=""
        style={imgBgStyle}
      />
      <div>
        <div className="flex mb-44">
          <div className={`p-10 pt-32 pl-40 ${styles.p10}`}>
            <div>
              <div
                id="tittle-gim"
                className={`flex gap-7 tittle-gim ${styles.tittleGim}`}
              >
                <div className="text-left">
                  <h1
                    className={`text-customOrange relative top-2/3 text-7xl font-bold tracking-widest shadow-custom `}
                  >
                    GIMNASIO
                  </h1>
                </div>
                <img
                  className="w-1/6"
                  src="https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/img/pesa.gif"
                  alt=""
                />
              </div>
              <h2
                className={`text-6xl text-left font-bold shadow-custom ${styles.subtitulo}`}
              >
                SALUD EN MOVIMIENTO
              </h2>
            </div>
            <div>
              <div className={`flex gap-20 pt-10 ${styles.flexgap}`}>
                <div className="text-2xl flex">
                  <div className="mt-4 flex">
                    <FaMapMarkerAlt className="inline w-12 h-12 pr-3 pt-2" />
                    <div className={`mr-20 ${styles.direccion}`}>
                      SALADILLO
                      <p>AV. SAAVEDRA 3253</p>
                    </div>
                  </div>
                </div>
                {/* <button className="">
                  
                </button> */}
                <Link
                  offset={-HeaderHeight}
                  className={`hover:text-white text-white mt-4 bg-customOrange rounded-none  border-white border-4 text-2xl pt-5 pb-5 pl-16 pr-16 hover:cursor-pointer ${styles.button}`}
                  to="formulario"
                  smooth={true}
                  duration={1000}
                >
                  CONTACTO
                </Link>
              </div>
            </div>
          </div>
          <img
            src={primerimg}
            alt=""
            className={`w-1/4 h-1/4 pt-36 img-1 ${styles.img1}`}
          />
        </div>
      </div>
    </div>
  );
};

<style>.img-bg</style>;

export default Inicio;
