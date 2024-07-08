import React from "react";
import Layout from '@/components/Layout'
import MenuIcon from '@/components/MenuIcon'
import { IconHome, IconSetting, IconMonitor, IconUser } from './Icon'
// 路由表
const routes = [
  {
    key: '/VirtualList',
    path: '/VirtualList',
    label: '虚拟列表',
    icon: <MenuIcon src={IconHome} />,
    element: Layout('/VirtualList'),
  },
  {
    key: '/Three',
    path: '/Three',
    label: 'Three',
    icon: <MenuIcon src={IconHome} />,
    element: Layout('/Three'),
  },
  // 路由重定向
  {
    path: '*',
    element: Layout('/NotFound'),
    hidden: true,
  }
]

export default routes