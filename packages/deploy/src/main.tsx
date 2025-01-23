// import { StrictMode } from 'react'
// import "./infra/instrument.ts";
import { createRoot } from 'react-dom/client';
// import './index.scss';
import {
  BrowserRouter,
  HashRouter,
  RouterProvider,
} from 'react-router';
import router from './routes/index.tsx';
import App from './pages/App.tsx';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  //   <HashRouter>
  //     <App />
  //   </HashRouter>
);
