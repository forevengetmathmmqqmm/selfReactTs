import { Outlet, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import { Layout } from 'antd';
import SiderMenu from "./side-menu";
import { useEffect, useState } from "react";
import HeaderContent from "./header-content";
import { userDetailApi } from "../../api/user";
import { connect } from "react-redux";
import { userInfoInter } from "../../utils/inter";
import { menuSelectKeys, userInfoAct } from "../../actions";
const { Header, Footer, Sider, Content } = Layout;

const layout:React.FC<{
  id: string
  setUserInfo: (val: userInfoInter) => void
  setSelectKeys: (val: string[]) => void
}> = (props) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    props.id && userDetailApi(props.id).then(res => {
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      props.setUserInfo(res.data)
      navigate('/webThree/connect');
    })
  }, [props.id])
  useEffect(() => {
    let paths = location.pathname.split('/').filter(item => item);
    props.setSelectKeys(paths)
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
const mapStateToProps = (state: any) => {
  return {
    id: state.user.userId
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (userinfo: userInfoInter) => dispatch(userInfoAct(userinfo)),
  setSelectKeys: (keys: string[]) => dispatch(menuSelectKeys(keys)),
})
export default connect(mapStateToProps, mapDispatchToProps)(layout);