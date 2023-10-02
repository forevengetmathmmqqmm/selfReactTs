import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { LogoutOutlined, SettingFilled, UserOutlined } from '@ant-design/icons';
import { headerKeys } from '../../utiles/enums';
import { useNavigate } from "react-router-dom";
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

const HeaderContent: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key == headerKeys.loginout) {
      navigate("/login")
    }
  };
	return (
		<>
			<div className="text-white flex justify-between">
				<div>icon</div>
				<Dropdown menu={{ items, onClick }}>
					<div className="flex items-center ">
						<img src="/src/assets/one.jpg" className="w-14 h-14 rounded-full" />
						<span className="w-16 ml-3">admin</span>
					</div>
				</Dropdown>
			</div>
		</>
	);
}

export default HeaderContent;