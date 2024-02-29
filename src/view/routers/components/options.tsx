import { Access, addAccessApi, getParentAccessListApi, detailAccessApi, editAccessApi } from "@/api/access";
import { RoleInter, roleListApi } from "@/api/role";
import { Options } from "@/utils/enums";
import { Form, FormInstance, Input, Select, Switch } from "antd";
import React from "react";
interface propsInter {
  options: Options
  id?: number
}
interface stateInter {
  form: React.RefObject<FormInstance<Access>>
  parentPouterList: Access[]
  roleList: RoleInter[]
}

export default class OptionsModal extends React.Component<propsInter, stateInter> {
  constructor(props: propsInter){
    super(props)
    this.state = {
      form: React.createRef<FormInstance>(),
      parentPouterList: [],
      roleList: [],
    }
  }
  componentDidUpdate(): void {
    this.state.form.current?.resetFields()
  }
  componentDidMount(): void {
    this.getRoleList()
    this.getParentAccessList()
  }
  async getRoleList(){
    const res = await roleListApi()
    this.setState({
      roleList: res.data.list
    })
  }
  async getParentAccessList(){
    const res = await getParentAccessListApi()
    this.setState({
      parentPouterList: res.data.list
    })
  }
  submit(cb: (val: Access) => void){
    this.state.form.current?.validateFields().then(async (formData) => {
      if(this.props.options == Options.add){
        formData.show = Number(formData.show)
        const res = await addAccessApi(formData)
        cb && cb(res.data)
      } else {
        formData.show = Number(formData.show)
        formData.id = this.props.id
        const resEdit = await editAccessApi(formData)
        cb && cb(resEdit.data)
      }
    })
  }
  async getDetail(){
    const res = await detailAccessApi(this.props.id as number)
    let formData = {
      ...res.data,
      has_children: Boolean(res.data.has_children),
      show: Boolean(res.data.show),
    }
    this.state.form.current?.setFieldsValue(formData)
  }
  render(): React.ReactNode {
    if(this.props.options == Options.edit) {
      this.getDetail()
    } 
    return <>
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
        <Form.Item label="父级路由" name="parent_router_id" rules={[{ required: true, message: '请选择父级路由' }]}>
          <Select allowClear options={this.state.parentPouterList} fieldNames={{label: 'name', value: 'id'}}/>
        </Form.Item>
        <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请选择角色' }]}>
          <Select mode="multiple" allowClear options={this.state.roleList} fieldNames={{label: 'title', value: 'id'}}/>
        </Form.Item>
        <Form.Item label="名 称" name="name" rules={[{ required: true, message: '请填写名称' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="路 径" name="path" rules={[{ required: true, message: '请填写路径' }]}>
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="组件路径" name="el_path">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="是否显示" name="show" valuePropName="checked">
          <Switch disabled={this.props.options == Options.audit}/>
        </Form.Item>
      </Form>
    </>
  }
}