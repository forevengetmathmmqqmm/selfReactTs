import { ParentAccess, addParentAccessApi, detailAccessParentApi, editParentAccessApi } from "@/api/access";
import { Options } from "@/utils/enums";
import { Form, FormInstance, Input, Switch } from "antd";
import React from "react";
interface propsInter {
  options: Options
  id?: number
}
interface stateInter {
  form: React.RefObject<FormInstance<ParentAccess>>
}

export default class OptionsModal extends React.Component<propsInter, stateInter> {
  constructor(props: propsInter){
    super(props)
    this.state = {
      form: React.createRef<FormInstance>(),
    }
  }
  componentDidUpdate(): void {
    this.state.form.current?.resetFields()
  }
  submit(cb: (val: ParentAccess) => void){
    this.state.form.current?.validateFields().then(async (formData) => {
      if(this.props.options == Options.add){
        formData.has_children = Number(formData.has_children)
        formData.show = Number(formData.show)
        const res = await addParentAccessApi(formData)
        cb && cb(res.data)
      } else {
        formData.has_children = Number(formData.has_children)
        formData.show = Number(formData.show)
        formData.id = this.props.id
        const resEdit = await editParentAccessApi(formData)
        cb && cb(resEdit.data)
      }
    })
  }
  async getDetail(){
    const res = await detailAccessParentApi(this.props.id as number)
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
        <Form.Item label="名 称" name="name" rules={[{ required: true, message: '请填写名称' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="路 径" name="path" rules={[{ required: true, message: '请填写路径' }]}>
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="是否有子路由" name="has_children" valuePropName="checked">
          <Switch disabled={this.props.options == Options.audit}/>
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