import React from 'react';
import { Tabs } from 'antd';
import "./index.scss"
import BaseList from './BaseList'
import WaterFallList from './WaterFallList'
import FixedHeightVirtualList from './FixedHeightVirtualList'
import FixedHeightWaterFallVirtualList from './FixedHeightWaterFallVirtualList'

const Virtual = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: 'BaseList',
      label: '定高基础列表',
      children: <BaseList></BaseList>,
    },
    {
      key: 'WaterFallList',
      label: '瀑布流列表',
      children: <WaterFallList></WaterFallList>,
    },
    {
      key: 'FixedHeightVirtualList',
      label: '定高基础虚拟列表',
      children: <FixedHeightVirtualList></FixedHeightVirtualList>,
    },
    {
      key: 'FixedHeightWaterFallVirtualList',
      label: '定高瀑布流虚拟列表',
      children: <FixedHeightWaterFallVirtualList></FixedHeightWaterFallVirtualList>,
    },
  ];
  return (
    <div className="virtual">
      <Tabs 
        destroyInactiveTabPane
        centered
        className='virtual-tabs'
        defaultActiveKey="FixedHeightWaterFallVirtualList" 
        items={items} 
        onChange={onChange} />
    </div>
  )
}

export default Virtual