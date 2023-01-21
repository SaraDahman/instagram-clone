import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { EditProfile } from '../component';
import {
  Home, Profile, SignUp, SignIn, Settings,
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
      {
        path: '/accounts/edit/',
        element: <Settings />,
        children: [{
          index: true,
          element: <EditProfile />,
        }],
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
