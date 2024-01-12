import React from "react"
import { Options } from "../../../utils/enums"
import { Form, FormInstance, Input, Select, Upload, UploadFile, UploadProps, message } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { roleListApi } from "../../../api/role"
import { connect } from "react-redux"
import { AddUserInter, UserInter, addUserApi, editUserApi, userDetailApi } from "../../../api/user"
interface PropsInter {
  options: Options
  id?: number
  token: string
}
interface DataInter {
  form: React.RefObject<FormInstance<AddUserInter>>
  roleList: roleInter[]
  upConfig: UploadProps
  loading: boolean
  fileList: UploadFile<any>[]
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
        action: import.meta.env.VITE_BASE_URL + '/comment/uploads',
        headers: {
          authorization: props.token,
        },
        onChange:(info)=>{
          this.setState({
            fileList: info.fileList
          })
          if (info.file.status === 'done') {
            this.state.form.current?.setFieldValue('avatar', info.file.response.data.path)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
          }
        },
      },
      fileList: [],
      loading: false,
    }
    this.getRoleList()
    props.id && this.getUserDetail(props.id)
  }
  componentWillReceiveProps(nextProps:  PropsInter): void {
    if(nextProps.id) {
      this.getUserDetail(nextProps.id)
    } else {
      this.state.form.current?.resetFields()
      this.setState({
        fileList: []
      })
    }
  }
  async getUserDetail(id: number){
    const res = await userDetailApi(id)
    this.state.form.current?.setFieldsValue(res.data)
    let fileList = [{
      uid: '-1',
      url: res.data.avatar,
    }] as UploadFile<any>[]
    this.setState({
      fileList
    })
  }
  async getRoleList(){
    const res = await roleListApi()
    this.setState({
      roleList: res.data.list
    })
  }
  submit(cb: (data: UserInter) => void){
    this.state.form.current?.validateFields().then(async (formData) => {
      let res: {data: UserInter}
      if(!this.props.id) {
        res = await addUserApi(formData)
      } else {
        let formParams = {
          ...formData,
          id: this.props.id
        }
        res = await editUserApi(formParams as UserInter)
      }
      typeof cb == 'function' && cb(res.data)
    })
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
          <Upload {...this.state.upConfig} fileList={this.state.fileList}>
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div className="mt-[8px]">upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="昵 称" name="nickname" rules={[{ required: true, message: '请填写昵称' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="密 码" name="password" rules={[{ required: true, message: '请填写密码' }]}>
          <Input.Password disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请填写联系电话' }]}>
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请选择角色' }]}>
          <Select allowClear options={this.state.roleList} fieldNames={{label: 'title', value: 'id'}}/>
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
export default connect(mapStateToProps,null,null, {forwardRef: true})(OptionsUser);