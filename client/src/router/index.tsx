import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Home, Profile } from '../pages';

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
]);
export default router;
