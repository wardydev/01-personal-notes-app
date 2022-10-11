import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

import Layout from "../../components/Layout";
import { getThemeStatus } from "../../utils/functions";
import {
  getAccessToken,
  login,
  putAccessToken,
} from "../../utils/network-data";
import { ThemeContext } from "../../context/SearchProvider";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [inputValue, setInputValue] = useState(initialState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useState(ThemeContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setIsLoading(false);
      const { email, password } = inputValue;
      const data = await login({ email, password });
      if (!data.error) {
        navigate("/");
        putAccessToken(data.data.accessToken);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  const hanleChangeLoginInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  if (getAccessToken() !== null) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout isActiveSearchBar={false}>
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={handleSubmitLogin}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className={`form-label ${
                  getThemeStatus() === "true" || isDark
                    ? "text-light"
                    : "text-dark"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                className={`form-control ${
                  getThemeStatus() === "true" || isDark
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                }`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                required
                onChange={hanleChangeLoginInput}
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className={`form-label ${
                  getThemeStatus() === "true" || isDark
                    ? "text-light"
                    : "text-dark"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  getThemeStatus() === "true" || isDark
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                }`}
                id="exampleInputPassword1"
                name="password"
                required
                onChange={hanleChangeLoginInput}
                autoComplete="password"
              />
            </div>
            <button
              type="submit"
              className={`btn ${
                getThemeStatus() === "true" || isDark ? "btn-light" : "btn-dark"
              }`}
            >
              {isLoading ? (
                <div class="spinner-border text-warning" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="mt-3">
            <span
              className={
                getThemeStatus() === "true" || isDark
                  ? "text-light"
                  : "text-dark"
              }
            >
              Have'nt an account yet? <Link to="/register">Register Here</Link>{" "}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
