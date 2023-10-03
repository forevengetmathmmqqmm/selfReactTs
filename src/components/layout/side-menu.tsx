import React, { useEffect, useState } from 'react';
import router from '../../router';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteObject, useNavigate } from 'react-router-dom';
import { SubMenuType } from 'antd/es/menu/hooks/useItems';
import { connect } from 'react-redux';
type MenuItem = Required<MenuProps>['items'][number];

const siderMenu: React.FC<{
  selectedKeys: string[]
}> = (props) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  let routers: MenuItem[] = [];
  useEffect(() => {
    getItems(router.routes[0].children as RouteObject[], routers);
    setMenus(routers);
  }, [])
  useEffect(() => { 
    setSelectedKeys(props.selectedKeys);
  }, [props.selectedKeys])
  function getItems(arr: RouteObject[], routers: MenuItem[]) {
    for (let index = 0; index < arr.length; index++) {
      let item = arr[index];
      routers[index] = {
        label: item.handle.name,
        icon: item.handle.icon,
        key: item.path,
      } as MenuItem
      if(item.children?.length) {
        (routers[index] as SubMenuType).children = [] as MenuItem[];
        getItems(item.children, (routers[index] as SubMenuType).children);
      }
    }
  }
  const toUrl: MenuProps['onClick'] = (e) => {
    navigate('/' + e.keyPath.reverse().join('/'));
    setSelectedKeys(e.keyPath.reverse());
  };
  return (
    <div className='w-full'>
      <Menu
        selectedKeys={ selectedKeys }
        mode="inline"
        onClick={toUrl}
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