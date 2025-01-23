import { createBrowserRouter } from "react-router-dom"; // 确保使用 react-router-dom，而不是 react-router
import App from "../pages/App";
import Test1 from "../pages/Test1";

/** @type {import('react-router-dom').RouteObject[]} */
const router = createBrowserRouter([

  {
    path:"/test1",
    element:<Test1/>
  },
  {
    path:"/",
    element: <App />,
  },
]);

export default router;
