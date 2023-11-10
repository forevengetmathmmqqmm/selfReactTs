import { Button, Popconfirm, Table, Tag, message } from "antd"
import React from "react"
import { ActivityMap, ActivityType, AuditStatus, AuditStatusMap, Options, OptionsMap } from "../../utils/enums"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalSelf from "../../components/common/modal-self"
import OptionsActivity from "./components/options"
import { ColumnsType } from "antd/es/table"
import SelfIcon from "../../components/common/self-icon"
import { getActivityListApi, delActivityApi } from "../../api/activity"
interface PropsInter {

}
interface ActivityInter {
  columns: ColumnsType<ActivityItemInter>
  dataList: ActivityItemInter[]
  isModalOpen: boolean
  title: string | undefined
  options: Options
  optionColumn: ActivityItemInter
  optRef: React.RefObject<any>
}
export interface ActivityItemInter{
  id: number
  num: number
  img_url: string
  status: number
  is_ok_apply: number
  activity_start: string
  activity_end: string
  create_at: string
  type: number
  Initial_voucher: number
}
export default class Activity extends React.Component<PropsInter, ActivityInter> {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      columns: [{
        title: 'id',
        key: 'id',
        fixed: 'left',
        width: 50,
        dataIndex: 'id',
      }, {
        title: '活动标题',
        key: 'name',
        width: 180,
        dataIndex: 'name'
      }, {
        title: '活动海报',
        key: 'img_url',
        width: 120,
        dataIndex: 'img_url',
        render: (val) => (<>
          <img src={val} className="w-[80px] h-[80px]"/>
        </>)
      }, {
        title: '是否开启报名',
        key: 'is_ok_apply',
        dataIndex: 'is_ok_apply',
        width: 120,
        render: (val) => <>
          {
            <Tag color={ val  ? '#50d71e' :  'cyan' }>{ val ? '进行中' : '已下架' }</Tag>
          }
        </>
      }, {
        title: '活动状态',
        key: 'status',
        dataIndex: 'status',
        width: 100,
        render: (val) =>
          <Tag color={ val == AuditStatus.pass ? '#50d71e' : val == AuditStatus.reject ? 'red' : 'cyan' }>{ AuditStatusMap.get(val) }</Tag>
      }, {
        title: '活动类型',
        key: 'type',
        dataIndex: 'type',
        width: 100,
        render: (val) =>
          <Tag color={ val == ActivityType.investmentActivity ? '#50d71e' : val == ActivityType.rapActivity ? 'red' : 'cyan' }>{ ActivityMap.get(val) }</Tag>
      }, {
        title: '名额',
        key: 'num',
        width: 100,
        dataIndex: 'num'
      }, {
        title: '初始代金券',
        key: 'initial_voucher',
        width: 120,
        dataIndex: 'initial_voucher'
      },{
        title: '活动开始时间',
        key: 'activity_start',
        dataIndex: 'activity_start',
        width: 140,
      }, {
        title: '活动结束时间',
        key: 'activity_end',
        dataIndex: 'activity_end',
        width: 140,
      }, {
        title: '创建时间',
        key: 'create_at',
        dataIndex: 'create_at',
        width: 180,
      }, {
        title: '操作',
        fixed: 'right',
        width: 250,
        render: (val, _, index) => (<>
          <Button type="text" size="small" icon={<EditOutlined />}  className="text-[#57bac9]" onClick={() => this.optionMusician(Options.edit, val)}>编辑</Button>
          <Popconfirm
            title="删除"
            description="请确认是否删除?"
            onConfirm={() => this.delMusician(val, index)}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ className: 'bg-[#50d71e]' }}
          >
            <Button type="text" size="small" icon={<DeleteOutlined />}  danger>删除</Button>
          </Popconfirm>
        </>)
      }],
      isModalOpen: false,
      title: OptionsMap.get(Options.add),
      dataList: [],
      options: Options.add,
      optionColumn: {} as ActivityItemInter,
      optRef: React.createRef<any>(),
    }
  }
  componentDidMount(): void {
    this.getList()
  }
  getList = async() => {
    const res = await getActivityListApi()
    this.setState({
      dataList: res.data.list
    })
  }
  optionMusician(type: Options, val?: any): void {
    this.setState({ 
      isModalOpen: true, 
      options: type, 
      title: OptionsMap.get(type),
      optionColumn: val || {},
    })
  }
  async delMusician(column: ActivityItemInter, index: number) {
    await delActivityApi(column.id)
    let list = [...this.state.dataList]
    list.splice(index, 1)
    this.setState({
      dataList: list
    })
    message.success('删除成功！！！')
  }
  modalOk = (val: ActivityItemInter) => {
    let list
    if(this.state.options == Options.add) {
      list = [val, ...this.state.dataList]
    } else {
      let index = this.state.dataList.findIndex((item: any) => item.id == this.state.optionColumn.id)
      list = [...this.state.dataList]
      list.splice(index, 1, val)
    }
    this.setState({
      dataList: list
    })
  }
  render(): React.ReactNode {
      return (<>
        <div className="m-[12px]" >
        <div className="bg-[#fff] mb-[6px] rounded-[6px] flex justify-between">
          <Button type="text" className="text-[#50d71e]"
            onClick={ () => this.optionMusician(Options.add) }>添加</Button>
          <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px] ml-[auto]" />
        </div>
        <Table columns={this.state.columns} dataSource={this.state.dataList} scroll={{ x: 300 }} rowKey="id" />
        <ModalSelf isModalOpen={this.state.isModalOpen} title={this.state.title as string}
          modalOk={this.modalOk} changeOpen={(val) => this.setState({ isModalOpen: val })} >
          <OptionsActivity options={ this.state.options } id={ this.state.optionColumn.id } ref={this.state.optRef} />
        </ModalSelf>
      </div>
      </>)
  }

} 