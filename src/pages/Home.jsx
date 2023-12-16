import React from "react";
import { Link } from "react-router-dom";
import DemoComponent from "../DemoComponent";

const Home = () => {
  return (
    <div>
      <Link to="/create/resume">
        <button>Create a resume</button>
      </Link>
      <DemoComponent />
    </div>
  );
};

export default Home;
