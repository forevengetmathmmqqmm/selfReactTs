import { RouteObject, createHashRouter } from "react-router-dom";
import { AppstoreOutlined, ContainerOutlined } from '@ant-design/icons';
import Layout from '../components/layout';
import Home from "../view/home";
import WebThree from "../view/webThree";
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
        handle: {
          icon: <AppstoreOutlined />,
          show: true,
          name: '首页',
        },
      },
      {
        path: "webThree",
        handle: {
          icon: <ContainerOutlined />,
          show: true,
          name: 'WEB3',
        },
        children: [{
          path: 'connect',
          element: <WebThree />,
          handle: {
            icon: <ContainerOutlined />,
            show: true,
            name: '链接',
          },
        }]
      },
    ],
  },
] as RouteObject[]);

export  default router;