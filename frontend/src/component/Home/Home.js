import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

const product = {
  name: "Remera azul",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: "$3500",
  _id: "patome",
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Bienvnidos al ecommerce [[[[[ {React.version} ]]]]]</p>
        <h1>Para la carga de ordenes</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
