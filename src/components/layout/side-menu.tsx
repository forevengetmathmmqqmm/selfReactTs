import React, { startTransition, useEffect, useState } from 'react'
import SelfIcon from "@/components/common/self-icon"
import { AppstoreOutlined } from '@ant-design/icons'
import { routersListApi } from "../../api/user";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
type MenuItem = Required<MenuProps>['items'][number];
interface Access {
  path: string
  name: string
  icon: string
  children_list: Access[]
}
const siderMenu: React.FC<{
  selectedKeys: string[]
}> = (props) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    routersListApi().then(res => {
      let list = res.data || []
      list = list.map((item: Access) => {
        let menuItem: MenuItem = {
          key: item.path,
          label: item.name,
          icon: <SelfIcon style={{color: '#000'}} type={item.icon}/>,
          children: item.children_list.map((item: Access) => {
            let childrenItem: MenuItem = {
              key: item.path,
              label: item.name,
              icon: <SelfIcon style={{color: '#000'}} type={item.icon}/>,
            }
            return childrenItem
          })
        }
        return menuItem;
      })
      list.unshift({
        key: "home",
        label: '首页',
        icon: <AppstoreOutlined />,
      })
      setMenus(list);
    })
  }, [])
  useEffect(() => { 
    setSelectedKeys(props.selectedKeys);
  }, [props.selectedKeys])
  const toUrl: MenuProps['onClick'] = (e) => {
    startTransition(() => {
      navigate('/' + e.keyPath.reverse().join('/'))
      setSelectedKeys(e.keyPath)
    })
  };
  const openChange: MenuProps['onOpenChange'] = (e) => {
    setSelectedKeys([e[e.length - 1]])
  }
  return (
    <div className='w-full'>
      <Menu
        selectedKeys={ selectedKeys }
        openKeys={ selectedKeys }
        mode="inline"
        onClick={toUrl}
        onOpenChange={openChange}
        items={menus}
      />
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    selectedKeys: state.app.selectedKeys
  }
}
export default connect(mapStateToProps)(siderMenu);