import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Rating = ({ value, size }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <BsStarFill style={{ color: "#FFD700", size: { size } }} />
        ) : value >= 0.5 ? (
          <BsStarHalf style={{ color: "#FFD700", size: { size } }} />
        ) : (
          <BsStar style={{ color: "#FFD700", size: { size } }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <BsStarFill style={{ color: "#FFD700", size: { size } }} />
        ) : value >= 1.5 ? (
          <BsStarHalf style={{ color: "#FFD700", size: { size } }} />
        ) : (
          <BsStar style={{ color: "#FFD700", size: { size } }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <BsStarFill style={{ color: "#FFD700", size: { size } }} />
        ) : value >= 2.5 ? (
          <BsStarHalf style={{ color: "#FFD700", size: { size } }} />
        ) : (
          <BsStar style={{ color: "#FFD700", size: { size } }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <BsStarFill style={{ color: "#FFD700", size: { size } }} />
        ) : value >= 3.5 ? (
          <BsStarHalf style={{ color: "#FFD700", size: { size } }} />
        ) : (
          <BsStar style={{ color: "#FFD700", size: { size } }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <BsStarFill style={{ color: "#FFD700", size: { size } }} />
        ) : value >= 4.5 ? (
          <BsStarHalf style={{ color: "#FFD700", size: { size } }} />
        ) : (
          <BsStar style={{ color: "#FFD700", size: { size } }} />
        )}
      </span>
    </div>
  );
};

export default Rating;
