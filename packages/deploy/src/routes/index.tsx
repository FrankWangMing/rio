import {
  createHashRouter,
  Navigate,
} from 'react-router-dom';
import App from '../pages/App';
import Container from '../pages/Container';
import React from 'react';

/** @type {import('react-router-dom').RouteObject[]} */
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
       {
          path: 'index',
          element: <Container data={{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["40","40","40","40"],"margin":["0","0","0","0"],"background":{"r":160,"g":54,"b":54,"a":1},"color":{"r":0,"g":0,"b":0,"a":1},"shadow":0,"radius":0,"width":"489px","height":"343px"},"events":{},"displayName":"Container","custom":{"displayName":"App"},"parent":null,"hidden":false,"nodes":[],"linkedNodes":{}}}}/>,
        },
       {
          path: 'index2',
          element: <Container data={{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","fillSpace":"no","padding":["40","40","40","40"],"margin":["0","0","0","0"],"background":{"r":255,"g":255,"b":255,"a":1},"color":{"r":0,"g":0,"b":0,"a":1},"shadow":0,"radius":0,"width":"788px","height":"530px"},"events":{},"displayName":"Container","custom":{"displayName":"App"},"parent":null,"hidden":false,"nodes":[],"linkedNodes":{}}}}/>,
        },
      
    ],
  },
  {
    path: '*',
    element: <Navigate to="/index" replace />,
  },
]);

export default router;
