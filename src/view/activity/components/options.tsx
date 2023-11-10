import React from "react"
import { ActivityMap, ActivityType, Options } from "../../../utils/enums"
import { DatePicker, Form, FormInstance, Input, Radio, Switch, Upload } from "antd"
import { addActivityApi, detailActivityApi, editActivityApi } from "../../../api/activity"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ActivityItemInter } from "../activity"
import { UploadChangeParam, UploadFile } from "antd/es/upload"
import { timeFormate } from "../../../utils"
import dayjs from 'dayjs'
interface OptActivity {
  form: React.RefObject<FormInstance<formInter>>
  type: ActivityType
  actUrl: string
  loading: boolean
  formData: ActivityItemInter
}
interface PropsInter {
  options: Options
  id?: number
}
interface formInter {
  [key: string]: string | number
}
export default class OptionsActivity extends React.Component<PropsInter, OptActivity> {
  constructor(props: PropsInter | Readonly<PropsInter>) {
    super(props)
    this.state = {
      form: React.createRef<FormInstance>(),
      type: ActivityType.rapActivity,
      actUrl: import.meta.env.VITE_BASE_URL + '/comment/uploads',
      loading: false,
      formData: {} as ActivityItemInter,
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
      this.setState({
        formData: {} as ActivityItemInter,
      })
    }
  }
  getDetail = async (id: number) => {
    const res = await detailActivityApi(id)
    let { is_ok_apply, activity_start, activity_end } = res.data
    this.setState({
      formData: res.data
    })
    let formData = res.data
    formData.is_ok_apply = Boolean(is_ok_apply)
    formData.activity_start = dayjs(activity_start, 'YYYY-MM-DD')
    formData.activity_end = dayjs(activity_end, 'YYYY-MM-DD')
    this.state.form.current?.setFieldsValue(formData)
  }
  submit = (cb : (val: formInter) => void) => {
    this.state.form.current?.validateFields().then(async (formData) => {
      formData.activity_start = timeFormate(formData.activity_start)
      formData.activity_end = timeFormate(formData.activity_end)
      formData.is_ok_apply = Number(formData.is_ok_apply)
      formData.img_url = this.state.formData.img_url
      formData.num = Number(formData.num)
      formData.initial_voucher = Number(formData.initial_voucher)
      if(this.props.options == Options.add) {
        const res = await addActivityApi(formData)
        cb && cb(res.data as formInter)
      } else {
        formData.id = this.props.id as number
        const res = await editActivityApi(formData)
        cb && cb(res.data as formInter)
      }
    }).catch(_ => {
    })
  }

  handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true
      })
      return;
    }
    if (info.file.status === 'done') {
      let formData = {...this.state.formData}
      formData.img_url = info.file.response.data.path
      this.setState({
        formData,
        loading: false
      })
    }
  }
  typeChange = (e: any) => {
    let formData = {...this.state.formData}
    formData.type = e.target.value
    this.setState({
      formData,
    })
  }
  render(): React.ReactNode {
    let { loading, form, formData, } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return <>
      <Form
        className="mt-[12px]"
        ref={form}
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="活动标题" name="name" rules={[{ required: true, message: '请填写活动名称!' }]}>
          <Input disabled={this.props.options == Options.audit} />
        </Form.Item>
        <Form.Item label="活动海报路径" name="img_url" valuePropName="file" rules={[{ required: true, message: '请填写活动海报路径!' }]}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={this.state.actUrl}
            onChange={this.handleChange}
          >
            {formData.img_url ? <img src={formData.img_url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="开启报名" name="is_ok_apply" valuePropName="checked" >
          <Switch disabled={this.props.options == Options.audit} className="bg-[#ccc]" />
        </Form.Item>
        <Form.Item label="活动开始时间" name="activity_start" >
          <DatePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="活动结束时间" name="activity_end">
          <DatePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="活动类型" name="type" rules={[{ required: true, message: '请选择活动类型!' }]} >
          <Radio.Group onChange={this.typeChange}>
            <Radio value={ActivityType.rapActivity}>{ActivityMap.get(ActivityType.rapActivity)}</Radio>
            <Radio value={ActivityType.investmentActivity}>{ActivityMap.get(ActivityType.investmentActivity)}</Radio>
            <Radio value={ActivityType.regularActivity}>{ActivityMap.get(ActivityType.regularActivity)}</Radio>
          </Radio.Group>
        </Form.Item>
        {
          this.state.formData.type != ActivityType.rapActivity && (<>
            <Form.Item label="名额" name="num" rules={[{ required: true, message: '请填写名额!' }]}>
              <Input disabled={this.props.options == Options.audit} type="number" />
            </Form.Item>
            <Form.Item label="初始代金券" name="initial_voucher" rules={[{ required: true, message: '请填写初始代金券!' }]}>
              <Input disabled={this.props.options == Options.audit} type="number" />
            </Form.Item>
          </>)
        }
      </Form>
    </>
  }
}