import ModalSelf from "@/components/common/modal-self";
import { Options, OptionsMap } from "@/utils/enums";
import { Button, Table } from "antd";
import React from "react";
import { AppstoreAddOutlined } from '@ant-design/icons'
import { ColumnsType } from "antd/es/table";
import { getParentAccessList } from "@/api/access";
import OptionsModal from "./components/options";
interface propsInter {

}
interface stateInter {
  columns: ColumnsType<parentAccess>
  dataList: parentAccess[]
  title: string
  options: Options
  isModalOpen: boolean
}
interface parentAccess {
  [key: string]: string | number
}
export default class Routers extends React.Component<propsInter, stateInter> {
  constructor(props: propsInter){
    super(props)
    this.state = {
      columns: [{
        title: 'id',
        dataIndex: 'id',
        width: 50,
        fixed: 'left',
      },{
        title: '名称',
        dataIndex: 'name',
        width: 120,
      },{
        title: '路径',
        dataIndex: 'path',
        width: 250,
      },{
        title: '组价路径',
        dataIndex: 'el_path',
        width: 250,
      },{
        title: '图标',
        dataIndex: 'icon',
        width: 250,
      },{
        title: '是否显示',
        dataIndex: 'show',
        width: 120,
      }],
      dataList: [] as parentAccess[],
      title: OptionsMap.get(Options.add) as string,
      isModalOpen: false,
      options: Options.add,
    }
  }
  componentDidMount(): void {
    this.getList()
  }
  optionMusician(key: Options){
    this.setState({
      options: key,
      title: OptionsMap.get(key) as string,
      isModalOpen: true,
    })
  }
  async getList(){
    const res = await getParentAccessList()
    this.setState({
      dataList: res.data.list
    })
  }
  modalOk(){
    
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
            <OptionsModal options={this.state.options} />
        </ModalSelf>
      </div>
    </>
  }
}