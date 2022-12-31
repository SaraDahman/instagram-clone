import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ApiService } from './services/ApiService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
ApiService.init();
ApiService.setHeader();
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
