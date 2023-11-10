import React from "react";
import { Options } from "../../../utils/enums";
import { Form, FormInstance, Input, Radio } from "antd";
import { addMusicianApi, detailMusicianApi, editMusicianApi } from "../../../api/musician";
interface OptMusician {
  form: React.RefObject<FormInstance<formInter>>
}
interface PropsInter {
  options: Options
  id?: number
}
interface formInter {
  [key: string]: string | number
}
export default class OptionsMusician extends React.Component<PropsInter, OptMusician> {
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
        const res = await addMusicianApi(formData)
        cb && cb(res.data as formInter)
      } else {
        formData.id = this.props.id as number
        const res = await editMusicianApi(formData)
        cb && cb(res.data as formInter)
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
        <Form.Item label="艺 名" name="stage_name" rules={[{ required: true, message: '请填写艺名!' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="微信号" name="we_chat" rules={[{ required: true, message: '请填写微信号!' }]}>
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="签约公司" name="signing_company">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="所属厂牌" name="brand">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="微博号" name="weibo">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="QQ音乐号" name="qq_music">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="网易云号" name="net_ease_cloud">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        <Form.Item label="抖音号" name="tiktok">
          <Input disabled={this.props.options == Options.audit}/>
        </Form.Item>
        {
          this.props.options == Options.audit && (
            <Form.Item label="审核" name="status">
              <Radio.Group>
                <Radio value={2}>通过</Radio>
                <Radio value={3}>拒绝</Radio>
              </Radio.Group>
            </Form.Item>
          )
        }
      </Form>
    </>
  }
}