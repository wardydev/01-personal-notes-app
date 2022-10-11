import React from "react";
import PropTypes from "prop-types";
import { getThemeStatus } from "../../utils/functions";

const Alert = ({ message }) => {
  return (
    <div
      className={`alert ${
        getThemeStatus() === "true" ? "alert-secondary" : "alert-success"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
