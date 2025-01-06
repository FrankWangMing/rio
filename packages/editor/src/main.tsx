// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import './index.css'
import { RouterProvider } from 'react-router';
import router from './routes/index.ts';

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
