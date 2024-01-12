import { Button, Popconfirm, Table, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useRef, useState } from "react"
import { userListApi, userDelApi } from "../../api/user"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Options, OptionsMap } from "../../utils/enums"
import ModalSelf from "../../components/common/modal-self"
import OptionsUser from "./components/options"
import _ from 'lodash'
import { RoleInter, roleListApi } from "../../api/role"
interface userTypeInter {
  [key: string] : string | number
}
const UserManage:React.FC = () => {
  const [userList, setUserList] = useState<userTypeInter[]>([])
  const [title, setTitle] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<Options>(Options.add)
  const [columOptions, setColumOptions] = useState<userTypeInter>()
  const [roleList, setRoleLIst] = useState<RoleInter[]>([])
  const optionsRef = useRef<any>()
  const columns: ColumnsType<userTypeInter> = [{
    title: 'id',
    key: 'id',
    fixed: 'left',
    width: 50,
    dataIndex: 'id',
  }, {
    title: '昵称',
    key: 'nickname',
    width: 150,
    dataIndex: 'nickname'
  }, {
    title: '电话',
    key: 'phone',
    width: 120,
    dataIndex: 'phone'
  }, {
    title: '角色',
    dataIndex: 'role_id',
    ellipsis: true,
    width: 120,
    render: (val) => (<>
      {roleList.find(item => item.id == val)?.title || val}
    </>)
  },{
    title: '邮箱',
    key: 'email',
    width: 200,
    dataIndex: 'email'
  }, {
    title: '头像',
    key: 'avatar',
    dataIndex: 'avatar',
    width: 100,
    render: (val) => <img src={val} className="w-[50px] h-[50px]"/>,
  },  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
    width: 200,
  },{
    title: '描述',
    key: 'intro',
    dataIndex: 'intro',
    width: 180,
  },{
    title: '创建时间',
    key: 'id',
    dataIndex: 'create_on',
    width: 180,
  }, {
    title: '修改时间',
    key: 'modified_on',
    dataIndex: 'modified_on',
    width: 180,
  },{
    title: '操作',
    fixed: 'right',
    width: 200,
    render: (val, _, index) => (<>
      <Button type="text" size="small" icon={<EditOutlined />}  className="text-[#57bac9]" onClick={() => optionUser(Options.edit, val)}>编辑</Button>
      <Popconfirm
        title="删除"
        description="请确认是否删除?"
        onConfirm={() => delMusician(val, index)}
        okText="确认"
        cancelText="取消"
        okButtonProps={{ className: 'bg-[#50d71e]' }}
      >
        <Button type="text" size="small" icon={<DeleteOutlined />}  danger>删除</Button>
      </Popconfirm>
    </>)
  }]
  useEffect(() => {
    getList()
    getRoleList()
  }, [])
  // 获取列表
  const getList = async () => {
    const res = await userListApi()
    setUserList(res.data.list)
  }
  // 角色列表
  const getRoleList = async () => {
    const res = await roleListApi()
    setRoleLIst(res.data.list)
  }
  // 操作角色
  const optionUser = (key: Options, item?: userTypeInter) => {
    setColumOptions(item)
    setTitle(OptionsMap.get(key) as string)
    setOptions(key)
    setIsModalOpen(true)
  }
  // 删除
  const delMusician = async (item: userTypeInter, index: number) => {
    await userDelApi(item.id)
    let list = [...userList];
    list.splice(index, 1)
    setUserList(list)
    message.info('删除成功')
  }
  const modalOk = (data: userTypeInter) => {
    const list = _.uniqBy([data, ...userList], 'id')
    setUserList(list)
  }
  return (
    <div className="m-[12px]" >
      <div className="bg-[#fff] mb-[6px] rounded-[6px] flex justify-between">
        <Button type="text" className="text-[#50d71e]" onClick={ () => optionUser(Options.add) }>添加</Button>
        <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px] ml-[auto]" />
      </div>
      <Table columns={columns} dataSource={userList} rowKey="id" scroll={{ x: 300 }} />
      <ModalSelf isModalOpen={isModalOpen} title={title}  modalOk={modalOk} changeOpen={(val) => setIsModalOpen(val)}>
        <OptionsUser options={ options } ref={ optionsRef } id={ columOptions?.id as number }/>
      </ModalSelf>
    </div>
  )
}
export default UserManage