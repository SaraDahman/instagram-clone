import { FC } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/signIn';

const router = createBrowserRouter([
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);

const App:FC = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
);

export default App;
