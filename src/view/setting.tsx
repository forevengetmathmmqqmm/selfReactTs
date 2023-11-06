import { Button, Form, Input, Menu, Upload, UploadProps, message } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { connect } from "react-redux";
import { userInfoInter } from "../utils/inter";
import { UserInter, editUserApi } from "../api/user";
const setting: React.FC<{
  token: string
  userInfo: userInfoInter
}> = (props) => {
  const [form] = Form.useForm();
  const [menus, setMenus] = useState<ItemType<MenuItemType>[]>();
  const [selectedKeys, setSelectedKeys] = useState('base');
  const [imgUrl, setImgUrl] = useState('')
  const [upConfig, _] = useState<UploadProps>({
    name: 'file',
    action: import.meta.env.VITE_BASE_URL + '/uploads',
    headers: {
      authorization: props.token,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setImgUrl(info.file.response.data.path)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  })
  useEffect(() => { 
    setMenus([{
      key: 'base',
      label: '基础设置'
    }, {
      key: 'secure',
      label: '安全设置',
    }])
  }, [])
  useEffect(() => {
    setImgUrl(props.userInfo.avatar)
    form.setFieldsValue(props.userInfo)
  }, [props.userInfo])

  const onFinish = async (e: any) => {
    let data = {} as UserInter;
    Object.assign(data, e);
    data.id = props.userInfo.id;
    if(!imgUrl){

    } else {
      data.avatar = imgUrl;
      const res = await editUserApi(data);
      
    }
  };
  const toUrl = (e: any) => {
    setSelectedKeys(e.key)
  }
  return (
    <>
      <div className="w-full h-full p-[24px] flex">
        <Menu
          className="w-[220px]"
          defaultSelectedKeys={['base']}
          selectedKeys={[selectedKeys]}
          mode="inline"
          onClick={toUrl}
          items={menus}
        />
        <div className="flex-1">
          {
            selectedKeys == 'base' ?
            <div className="w-full bg-white ml-[6px] p-[12px] h-full max-w-[600px]" >
              <div className="text-[24px]">基本设置</div>
              <div className="flex flex-col items-center pt-[12px]">
                <img src={imgUrl} className="w-[96px] h-[96px] rounded-[50%]" />
                <Upload {...upConfig}>
                  <Button type="dashed" className="w-[110px] mt-[6px]" icon={<UploadOutlined />}>更换头像</Button>
                </Upload>
              </div>
              <Form
                className="mt-[12px]"
                name="wrap"
                form={form}
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
              >
                <Form.Item label="昵 称" name="nickname" rules={[{ required: true, message: '请填写昵称!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="邮 箱" name="email" rules={[{ required: true, message: '请填写邮箱!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="联系电话" name="phone">
                  <Input />
                </Form.Item>
                <Form.Item label="所在地区" name="address">
                  <Input />
                </Form.Item>
                <Form.Item label="个人简介" name="intro">
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item label=" ">
                  <Button type="primary" htmlType="submit" className="bg-yellow-300">提 交</Button>
                </Form.Item>
              </Form>
            </div> : <div className="w-full bg-white ml-[6px] p-[12px] h-full">
              <div className="text-[24px]">安全设置</div>
            </div>
          }
          {
            
          }
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    token: state.user.token,
    userInfo: state.user.userInfo,
  }
}
export default connect(mapStateToProps)(setting);