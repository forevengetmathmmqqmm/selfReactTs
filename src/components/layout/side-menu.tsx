import React, { useEffect, useState } from 'react';
import router from '../../router';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteObject, useNavigate } from 'react-router-dom';
import { SubMenuType } from 'antd/es/menu/hooks/useItems';
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const siderMenu: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  let routers: MenuItem[] = [];
  useEffect(() => {
    getItems(router.routes[0].children as RouteObject[], routers);
    setMenus(routers);
  }, [])
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
  };
  return (
    <div className='w-full'>
      <Menu
        mode="inline"
        onClick={toUrl}
        items={menus}
      />
    </div>
  );
};
export default siderMenu;