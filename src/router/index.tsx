import { RouteObject, createBrowserRouter } from "react-router-dom"
import { AppstoreOutlined, ContainerOutlined } from '@ant-design/icons'
import Layout from '../components/layout'
import Home from "../view/home"
import WebThree from "../view/webThree"
import Login from "../view/login"
import PrivateRoute from "../components/common/private-route"
import Personal from "../view/personal"
import Setting from "../view/setting"
import SelfIcon from "../components/common/self-icon"
import UserManage from "../view/user/user"
import Musician from "../view/musician/musician"
import Activity from "../view/activity/activity"
import Role from "../view/role"
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
        path: "role",
        handle: {
          icon: <SelfIcon style={{color: '#000'}} type={"icon-user-manage"} />,
          show: true,
          name: '角色管理',
        },
        children: [{
          path: 'role_manage',
          handle: {
            icon: <SelfIcon style={{color: '#000'}} type={"icon-user-manage"} />,
            show: true,
            name: '会员管理',
          },
          element: <Role />
        }]
      },
      {
        path: "user",
        handle: {
          icon: <SelfIcon style={{color: '#000'}} type={"icon-user-manage"} />,
          show: true,
          name: '会员管理',
        },
        children: [{
          path: 'manage',
          handle: {
            icon: <SelfIcon style={{color: '#000'}} type={"icon-user-manage"} />,
            show: true,
            name: '会员管理',
          },
          element: <UserManage />
        }]
      },
      {
        path: "musician",
        handle: {
          icon: <SelfIcon style={{color: '#000'}} type={"icon-music-player"} />,
          show: true,
          name: '音乐人管理',
        },
        children: [{
          path: 'musician_manage',
          handle: {
            icon: <SelfIcon style={{color: '#000'}} type={"icon-music-player"} />,
            show: true,
            name: '音乐人管理',
          },
          element: <Musician />
        }]
      },{
        path: "activity",
        handle: {
          icon: <SelfIcon style={{color: '#000'}} type={"icon-activity-manage"} />,
          show: true,
          name: '活动管理',
        },
        children: [{
          path: 'activity_manage',
          handle: {
            icon: <SelfIcon style={{color: '#000'}} type={"icon-activity-manage"} />,
            show: true,
            name: '活动管理',
          },
          element: <Activity />
        }]
      },{
        path: "banner",
        handle: {
          icon: <SelfIcon style={{color: '#000'}} type={"icon-banner-manage"} />,
          show: true,
          name: '轮播图管理',
        },
        children: [{
          path: 'banner_manage',
          handle: {
            icon: <SelfIcon style={{color: '#000'}} type={"icon-banner-manage"} />,
            show: true,
            name: '轮播图管理',
          },
          element: <Activity />
        }]
      },{
        path: "webThree",
        handle: {
          icon: <SelfIcon style={{color: '#000'}} type={"icon-web3"} />,
          show: true,
          name: 'WEB3',
        },
        children: [{
          path: 'connect',
          element: <WebThree />,
          handle: {
            icon: <ContainerOutlined />,
            show: true,
            name: 'metamask',
          },
        }]
      },
      {
        path: "pigsty",
        handle: {
          icon: <SelfIcon type={"icon-pigsty"} />,
          show: false,
          name: '猪圈管理',
        },
        children: [{
          path: 'pig',
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