import { Breadcrumb } from 'antd';
import React, { useEffect, useState, } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import routers from '@/config/router'
import "./index.less"

const flattenTree = (tree, parent = null, result = []) => {
  for (let node of tree) {
    const { path, label, children } = node;
    const nodeWithParent = { path, label, parent };
    result.push(nodeWithParent);
    if (children) {
      flattenTree(children, path, result);
    }
  }
  return result;
}

const getMenuTitle = (keys) => {
  let menus = flattenTree(routers)
  let result = [
    {
      href: '/monitor/bigscreen',
      title: <HomeOutlined />,
    },
  ]
  const end = keys.length - 1
  keys.forEach((key, index) => {
    menus.forEach(router => {
      
      if(key == router.path) {
        let item = {
          title: router.label,
        }
        
        if(index > 0 && index != end) {
          item.href = `${router.parent}/${router.path}`
        }
        result.push(item)
      }
    })
  })
  return result
}

const Breadcrumbs = (props) => {
  const { bg } = props
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(['/login'])
  const [items, setItems] = useState([])
  const [show, setShow] = useState(true)

  useEffect(() => {
    let keys = location.pathname.split('/')
    keys.shift()
    keys[0] = '/' + keys[0]
    const len = keys.length
    // -------------隐藏二级以上菜单-------------
    // if (len < 3) {

    // }
    if (len < 2) {
      setShow(false)
    } else {
      setShow(true)
    }
    // -------------隐藏二级以上菜单-------------
    const list = getMenuTitle(keys)
    setItems(list)
  }, [location.pathname])

  return (
    <div className='breadcrumb' style={{ background: bg, display: show ? 'block' : 'none' }}>
      <Breadcrumb
        separator="/"
        items={items}/>
    </div>
  );
};
export default Breadcrumbs;