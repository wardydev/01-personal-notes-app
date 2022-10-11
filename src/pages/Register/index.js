import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import { getThemeStatus } from "../../utils/functions";
import { register } from "../../utils/network-data";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [inputValue, setInputValue] = useState(initialState);
  const [isPasswordNotSame, setIsPasswordNotSame] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.password !== inputValue.confirmPassword) {
      setIsPasswordNotSame(true);
      _clearInputPassword();
    }

    const { name, email, password } = inputValue;
    try {
      const data = await register({ name, email, password });
      if (!data.error) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputRegisterChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const _clearInputPassword = () => {
    inputValue.password = "";
    inputValue.confirmPassword = "";
  };

  return (
    <Layout isActiveSearchBar={false}>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3">
              <label
                htmlFor="nameInput"
                className={`form-label ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                }`}
                id="nameInput"
                aria-describedby="emailHelp"
                name="name"
                required
                value={inputValue.name}
                onChange={handleInputRegisterChange}
                autoComplete="name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="emailInput"
                className={`form-label ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                className={`form-control ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                }`}
                id="emailInput"
                aria-describedby="emailHelp"
                name="email"
                required
                value={inputValue.email}
                onChange={handleInputRegisterChange}
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="passwordInput"
                className={`form-label ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                } ${isPasswordNotSame && "form-control-error"}`}
                id="passwordInput"
                name="password"
                required
                value={inputValue.password}
                onChange={handleInputRegisterChange}
                autoComplete="password"
              />
              {isPasswordNotSame && (
                <div id="emailHelp" className="form-text text-danger">
                  Your password and confirm password didnt match, Lets Fix it!
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className={`form-label ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  getThemeStatus() === "true" && "bg-dark text-light"
                } ${isPasswordNotSame && "form-control-error"}`}
                id="confirmPassword"
                name="confirmPassword"
                required
                value={inputValue.confirmPassword}
                onChange={handleInputRegisterChange}
                autoComplete="confirm-password"
              />
              {isPasswordNotSame && (
                <div id="emailHelp" className="form-text text-danger">
                  Your password and confirm password didnt match, Lets Fix it!
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`btn ${
                getThemeStatus() === "true" ? "btn-light" : "btn-dark"
              }`}
            >
              Register
            </button>
          </form>
          <div className="mt-3">
            <span className={getThemeStatus() === "true" && "text-light"}>
              Already have an account? <Link to="/login">Login Here</Link>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
