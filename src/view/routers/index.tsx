import ModalSelf from "@/components/common/modal-self";
import { Options, OptionsMap } from "@/utils/enums";
import { Button, Popconfirm, Table, message } from "antd";
import React from "react";
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnsType } from "antd/es/table";
import { Access, delAccessApi, getAccessList, getParentAccessListApi } from "@/api/access";
import { RoleInter, roleListApi } from "@/api/role";
import OptionsModal from "./components/options";
interface propsInter {}
interface stateInter {
  columns: ColumnsType<Access>
  dataList: Access[]
  title: string
  options: Options
  isModalOpen: boolean
  optRef: React.RefObject<any>
  optionColumn: Access
  colOptions: Access
  parentAccess: Access[]
  roleList: RoleInter[]
}

export default class Routers extends React.Component<propsInter, stateInter> {
  constructor(props: propsInter){
    super(props)
    this.state = {
      colOptions: {} as Access,
      optionColumn: {} as Access,
      columns: [{
        title: 'id',
        dataIndex: 'id',
        width: 50,
        fixed: 'left',
      },{
        title: '名称',
        dataIndex: 'name',
        width: 80,
        ellipsis: true,
      },{
        title: '路径',
        dataIndex: 'path',
        width: 80,
        ellipsis: true,
      },{
        title: '图标',
        dataIndex: 'icon',
        width: 80,
        ellipsis: true,
      },{
        title: '组价路径',
        dataIndex: 'el_path',
        width: 80,
        ellipsis: true,
      },{
        title: '父级路由',
        dataIndex: 'parent_router_id',
        width: 80,
        ellipsis: true,
        render: (val) => (<>{ this.state.parentAccess.find(item => item.id == val)?.name }</>)
      },{
        title: '角色',
        dataIndex: 'role_ids',
        width: 80,
        ellipsis: true,
        render: (val) => (<>{ val.map((valItem: number) => {
          let roleData = this.state.roleList.find(item => item.id == valItem)
          return roleData?.title
        }).join(',')}</>)
      },{
        title: '是否显示',
        dataIndex: 'show',
        width: 80,
        ellipsis: true,
        render: (val) => (<>
          { val ? '是' : '否'}
        </>)
      }, {
        title: '操作',
        width: 220,
        fixed: 'right',
        render: (val, _, index) => (<>
          <Button type="text" size="small" icon={<EditOutlined />}  className="text-[#57bac9]" onClick={() => this.optionRouter(Options.edit, val)}>编辑</Button>
          <Popconfirm
            title="删除"
            description="请确认是否删除?"
            onConfirm={() => this.delRouter(val, index)}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ className: 'bg-[#50d71e]' }}
          >
            <Button type="text" size="small" icon={<DeleteOutlined />}  danger>删除</Button>
          </Popconfirm>
        </>)
      }],
      dataList: [] as Access[],
      roleList: [],
      title: OptionsMap.get(Options.add) as string,
      isModalOpen: false,
      options: Options.add,
      optRef: React.createRef<any>(),
      parentAccess: [],
    }
    this.getRoleList()
    this.getParentAccessList()
    this.modalOk = this.modalOk.bind(this)
  }
  componentDidMount(): void {
    this.getList()
  }
  optionRouter(key: Options, item?: Access){
    this.setState({
      options: key,
      title: OptionsMap.get(key) as string,
      isModalOpen: true,
      colOptions: item as Access,
    })
  }
  async delRouter(item: Access, index: number){
    await delAccessApi(item.id as number)
    message.success('删除成功')
    let list = [...this.state.dataList]
    list.splice(index, 1)
    this.setState({
      dataList: list,
    })
  }
  async getList(){
    const res = await getAccessList()
    this.setState({
      dataList: res.data.list
    })
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
      parentAccess: res.data.list
    })
  }
  modalOk(val: Access){
    let list = [] as Access[]
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
            onClick={() => this.optionRouter(Options.add)}>添加</Button>
          <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px] ml-[auto]" />
        </div>
        <Table columns={this.state.columns} dataSource={this.state.dataList} scroll={{ x: 300 }} rowKey="id" />
        <ModalSelf isModalOpen={this.state.isModalOpen} title={this.state.title}
          modalOk={this.modalOk} changeOpen={(val) => this.setState({ isModalOpen: val })} >
            <OptionsModal options={this.state.options} ref={this.state.optRef} id={ this.state.colOptions?.id as number }/>
        </ModalSelf>
      </div>
    </>
  }
}