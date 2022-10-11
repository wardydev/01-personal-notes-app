import React from "react";
import { createRoot } from "react-dom/client";
import SearchProvider from "./context/SearchProvider";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

import "./styles/styles.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
