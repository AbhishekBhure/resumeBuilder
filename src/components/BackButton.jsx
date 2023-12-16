import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link to={destination}>back</Link>
    </div>
  );
};

export default BackButton;
