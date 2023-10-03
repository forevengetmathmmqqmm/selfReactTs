import { Outlet, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import { Layout } from 'antd';
import SiderMenu from "./side-menu";
import { useEffect, useState } from "react";
import HeaderContent from "./hearder-content";
const { Header, Footer, Sider, Content } = Layout;
function layout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    navigate('/setting');
  }, [])
  return (
    <div className="w-screen h-screen">
      <Layout className="h-full">
        <Header className="text-black px-6">
          <HeaderContent />
        </Header>
        <Layout>
          <Sider className="bg-transparent text-black" theme="light" collapsible collapsed={collapsed}>
            <div onClick={toggleCollapsed} className='text-right pr-6'>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <SiderMenu />
          </Sider>
          <Content className="text-black bg-slate-100">
            <Outlet />
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </div>
  )
}
export default layout;