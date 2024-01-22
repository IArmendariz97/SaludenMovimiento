import React from "react";
import "./TeamMember.css";
import { CgProfile } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";

const TeamMember = (props) => {
  const { id, nombre, edad, descripcion, ubicacion, instagram } = props;
  const enlaceInstagram = `https://www.instagram.com/${instagram}/`;

  return (
    <div className="wrapper">
      <div className="cards">
        <input type="checkbox" id={id} className="more" aria-hidden="true" />
        <div className="content">
          <div
            className="front"
            style={{
              backgroundImage:
                "url('https://png.pngtree.com/background/20210710/original/pngtree-technological-sense-business-line-background-picture-image_1014566.jpg')",
            }}
          >
            <div className="inner">
              <CgProfile className="h-28 w-28 text-black" />
              <h2 className="text-black">{nombre}</h2>
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <label htmlFor={id} className="button" aria-hidden="true">
                Informacion
              </label>
            </div>
          </div>
          <div className="back text-black">
            <div className="inner">
              <div className="info">
                <span className="number-edad">{edad}</span>
                <div className="icon">
                  <i className="fas fa-users"></i>
                  <span>Años</span>
                </div>
              </div>

              <div className="description">
                <p>{descripcion}</p>
              </div>
              <div className="location">{ubicacion}</div>
              <div className="price">
                <a
                  href={enlaceInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="m-2 h-12 w-12 faig cursor-pointer" />
                </a>
              </div>
              <label
                htmlFor={id}
                className="button return bg-black text-customOrange"
                aria-hidden="true"
              >
                Volver
                <i className="fas fa-arrow-left"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
