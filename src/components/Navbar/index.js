import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  IoBookSharp,
  IoArchive,
  IoLogOut,
  IoMoon,
  IoSunny,
} from "react-icons/io5";
import { getUserLogged, getAccessToken } from "../../utils/network-data";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/SearchProvider";
import { getThemeStatus, putThemeStatus } from "../../utils/functions";

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { isDark, setIsDark } = useContext(ThemeContext);

  const handleUserLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleThemeChanges = () => {
    setIsDark(!isDark);
    putThemeStatus(isDark);
  };

  useEffect(() => {
    try {
      getUserLogged().then((data) => {
        setUser(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light pt-5 pb-3 bg-transparent">
      <div className="container">
        <Link className="nav-link" to="/">
          <IoBookSharp
            size={30}
            color={`${getThemeStatus() === "true" ? "white" : "black"}`}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {getAccessToken() ? (
            <ul className="navbar-nav ms-auto">
              {getThemeStatus() === "true" ? (
                <li className="nav-item custom-nav-item">
                  <div className="nav-link" onClick={handleThemeChanges}>
                    <IoSunny size={30} color="yellow" />
                  </div>
                </li>
              ) : (
                <li className="nav-item custom-nav-item">
                  <div className="nav-link" onClick={handleThemeChanges}>
                    <IoMoon size={30} />
                  </div>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/archive">
                  <IoArchive
                    size={30}
                    color={getThemeStatus() === "true" ? "white" : "black"}
                  />
                </Link>
              </li>
              <li className="nav-item ms-3 custom-nav-item">
                <div className="nav-link" onClick={handleUserLogout}>
                  <IoLogOut
                    size={30}
                    color={getThemeStatus() === "true" ? "white" : "black"}
                  />
                  <span
                    className={`me-2 fw-semibold ${
                      getThemeStatus() === "true" ? "text-light" : "text-dark"
                    }`}
                  >
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              {getThemeStatus() === "true" ? (
                <li className="nav-item custom-nav-item">
                  <div className="nav-link" onClick={handleThemeChanges}>
                    <IoSunny size={30} color="yellow" />
                  </div>
                </li>
              ) : (
                <li className="nav-item custom-nav-item">
                  <div className="nav-link" onClick={handleThemeChanges}>
                    <IoMoon size={30} />
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
