import { createBrowserRouter } from "react-router-dom";
import AddNotes from "../pages/AddNotes";
import Archive from "../pages/Archive";
import DetailNotes from "../pages/DetailNotes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home heading="Card Active" />,
  },
  {
    path: "/archive",
    element: <Archive heading="Card Archive" />,
  },
  {
    path: "/notes/:noteId",
    element: <DetailNotes />,
  },
  {
    path: "/notes/new",
    element: <AddNotes />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
