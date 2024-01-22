import ImgSeM from "../../assets/SeM.png";
import { Link } from "react-scroll";

function Seccion6() {
  return (
    <div
      className="flex w-full mb-20 section6"
      style={{ backgroundColor: "#FF914D", height: "90vh" }}
    >
      <div
        id="seccion6"
        className="grid grid-cols-6 grid-rows-6 w-1/2 gap-2 gradiente"
      >
        <div className="col-span-3 col-start-2 row-start-1 w-full grid-rows-2 row-span-2 mt-5 card-s6 z-10">
          <div className="imgBx">
            <img
              src="https://media-public.canva.com/kCUrg/MAD0WHkCUrg/1/s.jpg"
              alt="imagen-seccion6"
              className="col-span-3 col-start-2 row-start-1 w-full grid-rows-2 row-span-2"
            />
          </div>
        </div>
        <div className="w-full col-span-3 col-start-4 row-start-3 card-s6 z-10">
          <div className="imgBx">
            <img
              src="https://mercadofitness.com/ar/wp-content/uploads/2019/12/Funcional-Gym-present%C3%B3-una-licencia-en-Z%C3%A1rate.jpg"
              alt=""
              className=" w-full col-span-3 col-start-4 row-start-3"
            />
          </div>
        </div>
        <div className="col-span-3 col-start-2 row-start-5 w-full card-s6 z-10">
          <div className="imgBx">
            <img
              src="https://vioksport.es/wp-content/uploads/2018/05/Entrenamiento-Gym-o-Casa.jpg"
              alt=""
              className="col-span-3 col-start-2 row-start-5 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex relative z-0">
        <img src={ImgSeM} alt="" className="h-full" />
        <div className="flex absolute bottom-1/4 right-4">
          <div className=" text-end">
            <h3 className="flex relative mb-2 max-w-lg text-black text-bold text-2xl text-center">
              LA ACTIVIDAD FISICA ES INNEGOCIABLE PARA UNA VIDA SALUDABLE
            </h3>
            <Link to="inicio" smooth={true} duration={1000}>
              <img
                src="https://media-public.canva.com/W1V7w/MADf5kW1V7w/3/t.png"
                alt=""
                className="-rotate-90 h-24 mt-24 ml-36"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seccion6;
