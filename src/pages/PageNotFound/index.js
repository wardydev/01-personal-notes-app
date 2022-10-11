import React from "react";
import Layout from "../../components/Layout";
import { getThemeStatus } from "../../utils/functions";

const PageNotFound = () => {
  return (
    <Layout isActiveSearchBar={false}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <h1 className={getThemeStatus() === "true" && "text-light"}>
          404 PAGE NOT FOUND
        </h1>
        ;
      </div>
    </Layout>
  );
};

export default PageNotFound;
