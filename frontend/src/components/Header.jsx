import logo from "../assets/logo.png";
import { Link } from "react-scroll";
import Register from "./Register";
import { useEffect, useRef, useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import "../App.css";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeRef = useRef(null);
  const menuRef = useRef(null);
  const [, setSubMenuOpen] = useState(false);
  const [, setMenuMenOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const [isMenuDesOpen, setIsMenuDesOpen] = useState(true);

  const cambiarEstilosDelUl = () => {
    const ulElement = document.querySelector(".menu-header.navigation");

    if (ulElement && isMenuDesOpen) {
      ulElement.setAttribute(
        "style",
        "background-color: #d46910; position: absolute; width:100%; top: 80%; right: 0; border-radius: 10px;"
      );
    } else if (ulElement) {
      ulElement.setAttribute("style", ""); // Restaurar estilos originales
    }
  };

  const desplegableMenu = () => {
    setIsMenuDesOpen(!isMenuDesOpen);
    cambiarEstilosDelUl();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevMenu) => {
      if (prevMenu) {
        setSubMenuOpen(false);
        setMenuMenOpen(false);
        setRegisterOpen(false);
        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = "scroll";
      }
      return !prevMenu;
    });
  };

  useEffect(() => {
    if (!isMenuOpen) {
      setSubMenuOpen(false);
      setMenuMenOpen(false);
      setRegisterOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !closeRef.current.contains(event.target)
      ) {
        document.body.style.overflow = "";
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const HeaderHeight = 112;

  return (
    <div
      id="navbar"
      className="sticky top-0 z-50  w-full shadow-lg flex items-center justify-between p-4 "
    >
      <div className="">
        <Link
          offset={-HeaderHeight}
          className=" hover:text-customOrange transition-colors duration-300 cursor-pointer"
          to="inicio"
          smooth={true}
          duration={500}
        >
          <img src={logo} alt="Logo" className="h-12 w-auto ml-10 logo" />
        </Link>
      </div>
      <div className="flex">
        <DarkModeToggle />
        <button className="hamburger" onClick={desplegableMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <ul
          className={`flex text-2xl p-5 gap-7 font-bold menu-header navigation ${
            isMenuDesOpen ? "hidden" : "flex"
          }`}
          id="menu-header1"
        >
          <li className="li-bb">
            <Link
              offset={-HeaderHeight}
              className=" hover:text-customOrange transition-colors duration-300 cursor-pointer"
              to="sedes"
              smooth={true}
              duration={1000}
              id="sedes"
            >
              <span className="block a-header" href="#sedes">
                SEDES
              </span>
            </Link>
          </li>
          <li className="li-bb">
            <Link
              offset={-HeaderHeight}
              className=" hover:text-customOrange transition-colors duration-300 cursor-pointer"
              to="nosotras"
              smooth={true}
              duration={1000}
              id="nosotras"
            >
              <span className="block a-header" href="#nosotras">
                NUESTRO EQUIPO
              </span>
            </Link>
          </li>
          <li className="z-10 li-bb">
            <Link
              offset={-HeaderHeight}
              className="hover:text-customOrange transition-colors duration-300 cursor-pointer "
              to="formulario"
              smooth={true}
              duration={1000}
              id="contacto"
            >
              <span className="block a-header" href="#formulario">
                CONTACTO
              </span>
            </Link>
          </li>
          <li className="li-bb">
            <div className={isMenuOpen ? "overlay open" : "overlay"}></div>
            <div
              ref={closeRef}
              onClick={toggleMenu}
              className="menu-toggle-landing hover:text-customOrange hover:cursor-pointer"
            >
              {isMenuOpen ? "Close" : "LOGIN"}
            </div>
          </li>
        </ul>
      </div>

      <div
        ref={menuRef}
        className={`toggleMenuLanding ${isMenuOpen ? "open" : ""} iniSesion`}
      >
        <div className="flex justify-end">
          <h3 className="create-landing mb-5 text-uppercase mr-20">
            {isRegisterOpen ? "CREAR CUENTA" : "INICIAR SESION"}
          </h3>
          <button
            className="bg-transparent flex border-none mt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <IoClose size={40} color="black" />
          </button>
        </div>
        <div>
          <Register
            isRegisterOpen={isRegisterOpen}
            setRegisterOpen={setRegisterOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
