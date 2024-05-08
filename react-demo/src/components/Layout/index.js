import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd';
const Layout = (path) => {
  const Com = lazy(() => import(`@/pages${path}`))
  // 需处理不存在的菜单 定向到404

  return (
    <Suspense fallback={
      <Spin />
    }>
      <Com/>
    </Suspense>
  )
}
/*
lazy和Suspense是react自带的功能。
lazy能够使得加载页面的时候快速加载，防止加载时所有的组件的一起加载。
Suspense是在路由加载时显示的界面：比如：这个组件中加载的界面就是文字‘加载中。。。。。’

*/

export default Layout