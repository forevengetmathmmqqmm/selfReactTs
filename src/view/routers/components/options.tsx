import { Options } from "@/utils/enums";
import { Form, FormInstance, Input } from "antd";
import React from "react";

interface propsInter {
  options: Options
}
interface stateInter {
  form: React.RefObject<FormInstance<formInter>>
}
interface formInter {
  [key: string]: string | number
}
export default class OptionsModal extends React.Component<propsInter, stateInter> {
  constructor(props: propsInter){
    super(props)
    this.state = {
      form: React.createRef<FormInstance>(),
    }
  }
  render(): React.ReactNode {
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
        <Form.Item label="组价路径" name="el_path">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="是否显示" name="show">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
      </Form>
    </>
  }
}