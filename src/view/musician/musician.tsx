import { Button, Popconfirm, Table, Tag, message } from "antd"
import React from "react"
import { ColumnsType } from "antd/es/table"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalSelf from "../../components/common/modal-self"
import OptionsMusician from "./components/options"
import { Options, OptionsMap, AuditStatus, AuditStatusMap } from "../../utils/enums"
import { getMusicianListApi, delMusicianApi } from "../../api/musician"
import SelfIcon from "../../components/common/self-icon"
interface MusicianInter {
  isModalOpen: boolean
  columns: ColumnsType<any>
  dataList: any
  options: Options
  title: string | undefined
  optRef: React.RefObject<any>
  optionColumn: any
}
export default class Musician extends React.Component<any, MusicianInter> {
  constructor(props: any) {
    super(props)
    this.state = {
      columns: [{
        title: 'id',
        key: 'id',
        fixed: 'left',
        width: 50,
        dataIndex: 'id',
      }, {
        title: '艺名',
        key: 'stage_name',
        width: 80,
        dataIndex: 'stage_name'
      }, {
        title: '微信号',
        key: 'we_chat',
        width: 80,
        dataIndex: 'we_chat'
      }, {
        title: '所属厂牌',
        key: 'signing_company',
        width: 180,
        dataIndex: 'signing_company'
      }, {
        title: '微博号',
        key: 'weibo',
        dataIndex: 'weibo',
        width: 100,
      }, {
        title: '网易云号',
        key: 'net_ease_cloud',
        dataIndex: 'net_ease_cloud',
        width: 100,
      }, {
        title: 'QQ音乐号',
        key: 'qq_music',
        dataIndex: 'qq_music',
        width: 100,
      }, {
        title: '抖音号',
        key: 'tiktok',
        dataIndex: 'tiktok',
        width: 100,
      }, {
        title: '认证状态',
        key: 'status',
        dataIndex: 'status',
        width: 100,
        render: (val) =>
          <Tag color={ val == AuditStatus.pass ? '#50d71e' : val == AuditStatus.reject ? 'red' : 'cyan' }>{ AuditStatusMap.get(val) }</Tag>
      }, {
        title: '审核时间',
        key: 'audit_time',
        dataIndex: 'audit_time',
        width: 200,
      }, {
        title: '申请时间',
        key: 'create_at',
        dataIndex: 'create_at',
        width: 200,
      },{
        title: '操作',
        fixed: 'right',
        width: 250,
        render: (val, _, index) => (<>
          <Button type="text" size="small" icon={<SelfIcon type={"icon-shenhe"} />}  className="text-[#50d71e]" onClick={() => this.optionMusician(Options.audit, val)}>审核</Button>
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
      dataList: [],
      optionColumn: {},
      isModalOpen: false,
      options: Options.add,
      title: OptionsMap.get(Options.add),
      optRef: React.createRef<any>()
    }
  }

  componentDidMount(): void {
    this.getList()
  }
  delMusician = async (column: any, index: number) => {
    await delMusicianApi(column.id)
    let list = [...this.state.dataList]
    list.splice(index, 1)
    this.setState({
      dataList: list
    })
    message.success('删除成功！！！')
  }
  getList = async() => {
    const res = await getMusicianListApi()
    this.setState({
      dataList: res.data.list
    })
  }
  modalOk = (val: {[key: string]: string | number}) => {
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
  optionMusician = (type: Options, item?: any) => {
    this.setState({ 
      isModalOpen: true, 
      options: type, 
      title: OptionsMap.get(type),
      optionColumn: item || {},
    })
  }
  render(): React.ReactNode {
    return <>
      <div className="m-[12px]" >
        <div className="bg-[#fff] mb-[6px] rounded-[6px] flex justify-between">
          <Button type="text" className="text-[#50d71e]"
            onClick={ () => this.optionMusician(Options.add) }>添加</Button>
          <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px] ml-[auto]" />
        </div>
        <Table columns={this.state.columns} dataSource={this.state.dataList} scroll={{ x: 300 }} rowKey="id" />
        <ModalSelf isModalOpen={this.state.isModalOpen} title={this.state.title as string}
          modalOk={this.modalOk} changeOpen={(val) => this.setState({ isModalOpen: val })} >
          <OptionsMusician options={ this.state.options } id={ this.state.optionColumn.id } ref={this.state.optRef} />
        </ModalSelf>
      </div>
    </>
  }
}