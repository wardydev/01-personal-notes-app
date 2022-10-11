import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../../utils/index";
import { getThemeStatus } from "../../utils/functions";

const Card = ({ note, isActiveLink = true }) => {
  return (
    <div>
      <div
        className={`card ${
          getThemeStatus() === "true" ? "bg-dark" : "bg-light"
        }`}
      >
        <div className="card-body">
          {isActiveLink ? (
            <Link to={`/notes/${note.id}`}>
              <h5 className="card-title">{note.title}</h5>
            </Link>
          ) : (
            <h5 className="card-title">{note.title}</h5>
          )}
          <h6 className="card-subtitle mb-2 text-muted">
            {showFormattedDate(note.createdAt)}
          </h6>
          <p
            className={`card-text ${
              getThemeStatus() === "true" ? "text-light" : "text-dark"
            }`}
          >
            {note.body}
          </p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  note: PropTypes.object.isRequired,
  isActiveLink: PropTypes.bool,
};

export default Card;
