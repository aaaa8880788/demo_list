import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import routers from '@/config/router'
import "./index.less"


const anlysePath = (url) => {
  const list = url.split('/').filter(item => item != '')
  const len = list.length
  let result = []
  if (len > 1) {
    const openKey = list.slice(0, len - 1)
    result.push(`/${openKey.join(',')}`)
  }
  return result
}
const filterMenu = (list) => {
  let menu = list.filter(item => !item.hidden)
  menu = menu.map(item => {
    let children = null
    if (item.children) {
      children = item.children.filter(child => !child.hidden)
      children = children.map(son => {
        return { ...son, children: null }
      })
    }
    return { ...item, children }
  });
  return menu
}
const Menus = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState([''])
  const [openKey, setOpenKey] = useState([])
  const [menuList, setMenuList] = useState([])


  useEffect(() => {
    setMenuList(filterMenu(routers))
  }, [])
  
  useEffect(() => {
    const keys = location.pathname.split('/')
    const len = keys.length
    if (len <= 3) {
      setActiveKey(location.pathname)
      setOpenKey(anlysePath(location.pathname))
    } else {
      const res = keys.splice(0, 3).join('/')
      setActiveKey(res)
      setOpenKey(anlysePath(res))
    }
  }, [location.pathname])

  const handleMenuSelect = ({ key, keyPath }) => {
    setActiveKey(key)
    navigate(key)
  }

  const handleMenuOpen = (openKeys) => {
    setOpenKey(openKeys)
  }

  return (
    <div className='menu'>
      <Menu
        className='menu-container'
        mode="inline"
        selectedKeys={activeKey}
        openKeys={openKey}
        items={menuList}
        onSelect={handleMenuSelect}
        onOpenChange={handleMenuOpen}
      />
    </div>
  );
};
export default Menus;