import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

// StarRating.propTypes = {
//   maxRating: PropTypes.number,
//   color: PropTypes.string,
//   size: PropTypes.number,
//   messages: PropTypes.arrayOf(PropTypes.string),
//   defaultRating: PropTypes.number,
//   onSetRating: PropTypes.func,
// };

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 30,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSIze: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

const Star = ({ onRate, full, onHoverIn, onHoverOut, size, color }) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    borderRadius: "50%",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {!full ? (
        <FaRegStar size={size} color={color} fill={color} stroke={color} />
      ) : (
        <FaStar size={size} color={color} fill={color} stroke={color} />
      )}
    </span>
  );
};

export default StarRating;
