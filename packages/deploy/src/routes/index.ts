
import { createBrowserRouter } from "react-router";
import App from "../pages/App";

/** @type {import('react-router').RoutesProps} */

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "shows/:showId",
        Component: App,
        loader: ({ request, params }) =>
          fetch(`/api/show/${params.id}.json`, {
            signal: request.signal,
          }),
      },
    ],
  },
  {
    path: "/shows",
  }
]);

export default router;