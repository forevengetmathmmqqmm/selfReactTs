import { createHashRouter } from "react-router-dom";
import Layout from '../components/layout';
import Home from "../view/home";
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
export  default router;