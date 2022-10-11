import React from "react";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import PropTypes from "prop-types";
import { getThemeStatus } from "../../utils/functions";

const Layout = ({ children, isActiveSearchBar }) => {
  return (
    <div
      className={`wrapper ${
        getThemeStatus() === "true" ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="container">
        <Navbar />
        {isActiveSearchBar && <SearchBar />}
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  isActiveSearchBar: PropTypes.bool,
};

export default Layout;
