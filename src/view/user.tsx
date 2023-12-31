import { Button, Popconfirm, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { userListApi } from "../api/user"
import SelfIcon from "../components/common/self-icon"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Options } from "../utils/enums"

interface userTypeInter {
  [key: string] : string
}
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
  width: 250,
  render: (val, _, index) => (<>
    <Button type="text" size="small" icon={<EditOutlined />}  className="text-[#57bac9]" onClick={() => optionMusician(Options.edit, val)}>编辑</Button>
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
const optionMusician = (type: Options, item?: any) => {
  
}
const delMusician = async (column: any, index: number) => {
    
}
const UserManage:React.FC = () => {
  const [userList, setUserList] = useState<userTypeInter[]>([])
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const res = await userListApi()
    setUserList(res.data.list)
  }
  return (
    <div className="m-[12px]" >
      <div className="bg-[#fff] mb-[6px] rounded-[6px] flex justify-between">
        <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px] ml-[auto]" />
      </div>
      <Table columns={columns} dataSource={userList} rowKey="id" scroll={{ y: 240 }} />
    </div>
  )
}
export default UserManage