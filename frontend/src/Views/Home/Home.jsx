import Rutinas from "../../components/Rutinas/Rutinas";
import Header from "../../components/Header";
import Categorias from "../../components/Categorias/Categorias";
import Inicio from "../../components/Inicio/Inicio";
import Sedes from "../../components/Sedes/Sedes";
import Nosotras from "../../components/Nosotras/Nosotras";
import Seccion6 from "../../components/Seccion6/Seccion6";
import Formulario from "../../components/Formulario/Formulario";
import Footer from "../../components/Footer";
import { Element } from "react-scroll";
import { useEffect, useState } from "react";

function Home() {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  return (
    <div>
      <Header
        className={`${
          isSticky ? "fixed top-0 z-50 w-full bg-white shadow-md" : "relative"
        }`}
      />
      <Element id="inicio" name="inicio">
        <Inicio />
      </Element>

      <Rutinas />
      <Categorias />

      <Element id="sedes" name="sedes">
        <Sedes />
      </Element>

      <Element id="nosotras" name="nosotras">
        <Nosotras />
      </Element>
      <Seccion6 />
      <Element id="formulario" name="formulario">
        <Formulario />
      </Element>

      <Footer />
    </div>
  );
}

export default Home;
