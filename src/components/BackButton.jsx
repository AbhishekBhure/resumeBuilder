import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <button className="bg-tertiary p-3 rounded-lg">
      <Link to={destination}>back</Link>
    </button>
  );
};

export default BackButton;
