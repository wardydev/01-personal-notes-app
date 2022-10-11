import React from "react";
import SearchProvider from "./context/SearchProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const App = () => {
  return (
    <>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
};

export default App;
