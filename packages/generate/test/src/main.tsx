// import { StrictMode } from 'react'
import './infra/instrument';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router';
import router from './routes/index.ts';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
