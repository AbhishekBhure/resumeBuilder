import React from "react";
import { Link } from "react-router-dom";
import DemoComponent from "../DemoComponent";

const Home = () => {
  return (
    <div>
      <div className="bg-hero-img bg-cover bg-no-repeat bg-center p-5 md:px-20 md:py-16 ">
        <h1 className="text-5xl md:text-8xl font-semibold leading-tight">
          Struggling to build <br /> a resume
        </h1>
        <p className="text-5xl md:text-8xl font-semibold">We got you</p>
        <Link to="/create/resume">
          <button className="bg-tertiary p-3 rounded-lg shadow-card mt-5">
            Create a resume
          </button>
        </Link>
      </div>
      <DemoComponent />
    </div>
  );
};

export default Home;
