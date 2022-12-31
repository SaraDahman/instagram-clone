import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  Home, Profile, SignUp, SignIn,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/:username',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
  {
    path: 'sign-in',
    element: <SignIn />,
  },
]);
export default router;
