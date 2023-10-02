
import { Button, Form, Input } from "antd";
import SelfIcon from "../components/common/self-icon";
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/")
  };
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-center w-72">
          <div className="flex items-center">
            <SelfIcon className="text-6xl" type={"icon-web3"} />
            <span className="text-4xl ml-2 text-yellow-400" >web3 admin</span>
          </div>
          <div className="text-xs mt-1">连接matemask，在区块链上进行交易</div>
          <Form
            name="normal_login"
            className="mt-3"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请填写用户名!' }]}
            >
              <Input size="large" placeholder="用户名 admin" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请填写密码!' }]}
            >
              <Input.Password size="large" placeholder="密码 123456" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" className="bg-yellow-300">登 陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default login;