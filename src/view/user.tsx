import { Button, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { useEffect, useState } from "react"
import { userListApi } from "../api/user"
import { AppstoreAddOutlined } from '@ant-design/icons'
interface userTypeInter {
  [key: string] : string
}
const columns: ColumnsType<userTypeInter> = [{
  title: 'id',
  key: 'id',
  dataIndex: 'id'
}, {
  title: '昵称',
  key: 'nickname',
  dataIndex: 'nickname'
}, {
  title: '电话',
  key: 'phone',
  dataIndex: 'phone'
}, {
  title: '邮箱',
  key: 'email',
  dataIndex: 'email'
}, {
  title: '头像',
  key: 'avatar',
  dataIndex: 'avatar',
  render: (val) => <img src={val} className="w-[50px] h-[50px]"/>
},  {
  title: '地址',
  key: 'address',
  dataIndex: 'address'
},{
  title: '描述',
  key: 'intro',
  dataIndex: 'intro'
},{
  title: '创建时间',
  key: 'id',
  dataIndex: 'create_on'
}, {
  title: '修改时间',
  key: 'modified_on',
  dataIndex: 'modified_on'
},{
  title: '操作',
  fixed: 'right',
  width: '200px',
  render: () => <>
    <Button type="text" className="text-[#50d71e]">修改</Button>
    <Button type="text" danger>修改</Button>
  </>,
}]
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
        <Button type="text" className="text-[#50d71e]">添加</Button>
        <Button type="text" icon={<AppstoreAddOutlined />} className="mr-[12px]" />
      </div>
      <Table columns={columns} dataSource={userList} rowKey="id" />
    </div>
  )
}
export default UserManage