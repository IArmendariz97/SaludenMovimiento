import img2 from "../../assets/funcional1.jpg";

import img4 from "../../assets/pilatesTabata.jpg";

function Imagenes() {
  return (
    <div
      className="grid grid-cols-2 grid-rows-2 gap-6 img-container"
      style={{ width: "80%", margin: "auto" }}
    >
      <img src={img2} alt="fuerza-img" className="w-3/4 m-auto " />
      <img src={img2} alt="fuerza-img" className="w-3/4 m-auto" />
      <img src={img4} alt="fuerza-img" className="w-3/4 m-auto " />
      <img src={img4} alt="fuerza-img" className="w-3/4 m-auto" />
    </div>
  );
}

export default Imagenes;
