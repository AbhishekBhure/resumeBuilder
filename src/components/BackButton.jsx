import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <Link to={destination}>
      <button className="bg-tertiary p-3 rounded-lg">back</button>
    </Link>
  );
};

export default BackButton;
