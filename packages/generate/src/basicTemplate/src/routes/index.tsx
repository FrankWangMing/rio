import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
} from 'react-router-dom'; // 确保使用 react-router-dom，而不是 react-router
import App from '../pages/App';
import Container  from '../pages/Container';

/** @type {import('react-router-dom').RouteObject[]} */
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '',
        element: <Container />,
      },
      {
        path: 'test1',
        element: <Container />,
      },
      {
        path: 't',
        element: <Container />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
