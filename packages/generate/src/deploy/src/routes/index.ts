
import { createBrowserRouter } from "react-router";
import App from "../pages/App";

/** @type {import('react-router').RoutesProps} */

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/shows",
  }
]);

export default router;