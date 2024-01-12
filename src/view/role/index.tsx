import { Button, Popconfirm, message } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import React from "react"
import { Options, OptionsMap } from "../../utils/enums"
import { roleDelApi, roleListApi } from "../../api/role"
import ModalSelf from "../../components/common/modal-self"
import OptionsRole from "./components/options"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface RoleStatus {
  columns: ColumnsType<any>
  dataList: any
  isModalOpen: boolean
  title: string
  options: Options
  optionColumn: any
  optRef: React.RefObject<any>
}
export default class Role extends React.Component<any, RoleStatus>{
  constructor(props: any) {
    super(props)
    this.state = {
      columns: [{
        title: 'id',
        dataIndex: 'id',
        width: 50,
        fixed: 'left',
      }, {
        title: '标题',
        dataIndex: 'title',
        width: 150,
      }, {
        title: '描述',
        dataIndex: 'desc',
        ellipsis: true,
        width: 220,
      }, {
        title: '状态',
        dataIndex: 'status'
      },{
        title: '操作',
        fixed: 'right',
        width: 250,
        render: (val, _, index) => (<>
          <Button type="text" size="small" icon={<EditOutlined />}  className="text-[#57bac9]" onClick={() => this.optionMusician(Options.edit, val)}>编辑</Button>
          <Popconfirm
            title="删除"
            description="请确认是否删除?"
            onConfirm={() => this.delRole(val, index)}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ className: 'bg-[#50d71e]' }}
          >
            <Button type="text" size="small" icon={<DeleteOutlined />}  danger>删除</Button>
          </Popconfirm>
        </>)
      }],
      dataList: [],
      options: Options.add,
      isModalOpen: false,
      title: OptionsMap.get(Options.add) as string,
      optionColumn: {},
      optRef: React.createRef<any>()
    }
    this.getList();
  }
  async getList(){
    const res = await roleListApi()
    this.setState({
      dataList: res.data.list
    })
  }
  delRole = async (column: any, index: number) => {
    await roleDelApi(column.id)
    let list = [...this.state.dataList]
    list.splice(index, 1)
    this.setState({
      dataList: list
    })
    message.success('删除成功！！！')
  }
  optionMusician(type: Options, item?: any) {
    this.setState({
      options: type,
      isModalOpen: true,
      title: OptionsMap.get(type) as string,
      optionColumn: item || {},
    })
  }
  modalOk(val: {[key: string]: string | number}){
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
    return <>
      <div className="m-[12px]" >
        <div className="bg-[#fff] mb-[6px] rounded-[6px] flex justify-between">
          <Button type="text" className="text-[#50d71e]"
            onClick={() => this.optionMusician(Options.add)}>添加</Button>
          <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px] ml-[auto]" />
        </div>
        <Table columns={this.state.columns} dataSource={this.state.dataList} scroll={{ x: 300 }} rowKey="id" />
        <ModalSelf isModalOpen={this.state.isModalOpen} title={this.state.title}
          modalOk={this.modalOk} changeOpen={(val) => this.setState({ isModalOpen: val })} >
          <OptionsRole options={ this.state.options } ref={this.state.optRef}/>
        </ModalSelf>
      </div>
    </>
  }
} 