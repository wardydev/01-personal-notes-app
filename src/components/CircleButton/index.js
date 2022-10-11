import React from "react";
import PropTypes from "prop-types";
import { getThemeStatus } from "../../utils/functions";

const CircleButton = ({ icon, onClicked, isRight }) => {
  return (
    <div
      className={`btn-circle shadow-lg ${
        getThemeStatus() === "true" ? "bg-light" : "bg-dark"
      }`}
      style={isRight && { right: 200 }}
      onClick={onClicked}
    >
      {icon}
    </div>
  );
};

CircleButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClicked: PropTypes.func.isRequired,
  isRight: PropTypes.bool,
};

export default CircleButton;
