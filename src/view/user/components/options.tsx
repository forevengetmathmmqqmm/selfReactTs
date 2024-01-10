import React from "react"
import { Options } from "../../../utils/enums"
import { Form, FormInstance, Input, Select, Upload, UploadProps } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { roleListApi } from "../../../api/role"
import { connect } from "react-redux"

interface PropsInter {
  options: Options
  token: string
}
interface FormInter {
  [key: string] : string
}
interface DataInter {
  form: React.RefObject<FormInstance<FormInter>>
  roleList: roleInter[]
  upConfig: UploadProps
  loading: boolean
}
interface roleInter {
  id: number
  title: string
  desc: string
}
class OptionsUser extends React.Component<PropsInter, DataInter>{
  constructor(props: PropsInter){
    super(props)
    this.state = {
      form: React.createRef<FormInstance>(),
      roleList: [] as roleInter[],
      upConfig: {
        name: 'file',
        listType: "picture-circle",
        maxCount: 1,
        accept: '.png',
        action: import.meta.env.VITE_BASE_URL + '/comment/uploads',
        headers: {
          authorization: props.token,
        },
      },
      loading: false,
    }
  }
  componentDidMount(): void {
     this.getRoleList() 
  }
  async getRoleList(){
    const res = await roleListApi();
    this.setState({
      roleList: res.data.list
    })
  }
  handleChange(){}
  submit(){
    console.log('>>>>>>>submit', this.state.form.current?.getFieldsValue());
  }
  render(): React.ReactNode {
    return(<>
      <Form
        className="mt-[12px]"
        ref={this.state.form}
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="头 像" name="avatar" valuePropName="file" rules={[{ required: true, message: '请选择头像' }]}>
          <Upload {...this.state.upConfig}>
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div className="mt-[8px]">Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="昵 称" name="nickname" rules={[{ required: true, message: '请填写昵称' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请填写联系电话' }]}>
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
          <Select allowClear  options={this.state.roleList} fieldNames={{label: 'title', value: 'id'}}/>
        </Form.Item>
        <Form.Item label="邮 箱" name="email">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="所在地区" name="address">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="个人简介" name="intro">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
      </Form>
    </>)
  }
}

const mapStateToProps = (state: any) => {
  return {
    token: state.user.token,
    userInfo: state.user.userInfo,
  }
}

export default connect(mapStateToProps)(OptionsUser)