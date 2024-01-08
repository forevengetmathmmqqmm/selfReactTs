import React from "react";
import { Options } from "../../../utils/enums";
import { Form, FormInstance, Input } from "antd";
import { detailMusicianApi } from "../../../api/musician";
import { RoleInter, editRoleApi } from "../../../api/role";
interface OptRole {
  form: React.RefObject<FormInstance<RoleInter>>
}
interface PropsInter {
  options: Options
  id?: number
}
interface formInter {
  [key: string]: string | number
}
export default class OptionsRole extends React.Component<PropsInter, OptRole> {
  constructor(props: PropsInter | Readonly<PropsInter>) {
    super(props)
    this.state = {
      form: React.createRef<FormInstance>(),
    }
    if(this.props.options != Options.add) {
      this.getDetail(this.props.id as number)
    }
  }
  componentWillReceiveProps(newVal: PropsInter): void {
    if(newVal.options != Options.add) {
      this.getDetail(newVal.id as number)
    } else {
      this.state.form.current?.resetFields()
    }
  }
  getDetail = async (id: number) => {
    const res = await detailMusicianApi(id)
    this.state.form.current?.setFieldsValue(res.data)
  }
  submit = (cb : (val: formInter) => void) => {
    this.state.form.current?.validateFields().then(async (formData) => {
      if(this.props.options == Options.add) {
        const res = await editRoleApi(formData)
        cb && cb(res.data as formInter)
      } else {
        // formData.id = this.props.id as number
        // const res = await editMusicianApi(formData)
        // cb && cb(res.data as formInter)
      }
    }).catch(_ => {
    })
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
        <Form.Item label="名 称" name="title" rules={[{ required: true, message: '请填写名称' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="描 述" name="desc">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
      </Form>
    </>
  }
}