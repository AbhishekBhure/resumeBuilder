import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "../icons";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return <div className="flex">{stars}</div>;
};

export default StarRating;
