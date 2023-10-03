import { RouteObject, createBrowserRouter } from "react-router-dom";
import { AppstoreOutlined, ContainerOutlined } from '@ant-design/icons';
import Layout from '../components/layout';
import Home from "../view/home";
import WebThree from "../view/webThree";
import Login from "../view/login";
import PrivateRoute from "../components/common/private-route";
import Personal from "../view/personal";
import Setting from "../view/setting";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Layout /></PrivateRoute> ,
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
      {
        path: "personal",
        element: <Personal />,
        handle: {
          icon: <AppstoreOutlined />,
          show: true,
          name: '个人中心',
        },
      },
      {
        path: "setting",
        element: <Setting />,
        handle: {
          icon: <AppstoreOutlined />,
          show: true,
          name: '个人设置',
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  }
] as RouteObject[]);

export  default router;