import React from "react";
import Layout from '@/components/Layout'
import MenuIcon from '@/components/MenuIcon'
import { IconHome, IconSetting, IconMonitor, IconUser } from './Icon'
// 路由表
const routes = [
  {
    key: '/FixedHeightVirtualList',
    path: '/FixedHeightVirtualList',
    label: '定高虚拟列表',
    icon: <MenuIcon src={IconHome} />,
    element: Layout('/FixedHeightVirtualList'),
  },
  // 路由重定向
  {
    path: '*',
    element: Layout('/NotFound'),
    hidden: true,
  }
]

export default routes