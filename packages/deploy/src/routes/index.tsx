import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
} from 'react-router-dom'; // 确保使用 react-router-dom，而不是 react-router
import App from '../pages/App';
import Test1 from '../pages/Test1';
import EditorContainer from '../pages/EditorContainer';

/** @type {import('react-router-dom').RouteObject[]} */
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '',
        element: <EditorContainer />,
      },
      {
        path: 'test1',
        element: <Test1 />,
      },
      {
        path: 't',
        element: <EditorContainer />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
