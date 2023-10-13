import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { LogoutOutlined, SettingFilled, UserOutlined } from '@ant-design/icons';
import { headerKeys } from '../../utils/enums';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { menuSelectKeys, userToken } from '../../actions';
import SelfIcon from '../common/self-icon';
import { userInfoInter } from '../../utils/inter';
const items: MenuProps['items'] = [
  {
    key: headerKeys.personal,
    label: (
			<>
				<Space>
					<UserOutlined />个人中心
				</Space>
			</>
    ),
  },
  {
    key: headerKeys.setting,
    label: (
      <Space><SettingFilled />个人设置</Space>
    ),
  },
  {
    key: headerKeys.loginout,
    label: (
      <Space><LogoutOutlined />退出登录</Space>
    ),
  }
];

const HeaderContent: React.FC<{
  userInfo: userInfoInter
  setToken: () => void
  setSelectKeys: (val: string[]) => void
}> = (props) => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key == headerKeys.loginout) {
      navigate("/login");
      localStorage.removeItem('token');
      props.setToken();
    } else{
      navigate(`/${key}`);
      props.setSelectKeys([key])
    }
  };
	return (
		<>
			<div className="text-white flex justify-between">
        <div className='flex items-center text-yellow-400'>
          <SelfIcon className="text-4xl" type={"icon-web3"} />
          <span className="text-xl ml-2" >web3 admin</span>
        </div>
				<Dropdown menu={{ items, onClick }}>
					<div className="flex items-center ">
						<img src={ props.userInfo?.avatar } className="w-[42px] h-[42px] rounded-full" />
						<span className="w-16 ml-3">{props.userInfo?.nickname}</span>
					</div>
				</Dropdown>
			</div>
		</>
	);
}
const mapStateToProps = (state: any) => {
  return {
    userInfo: state.user.userInfo
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  setToken: () => dispatch(userToken('')),
  setSelectKeys: (keys: string[]) => dispatch(menuSelectKeys(keys)),
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent);