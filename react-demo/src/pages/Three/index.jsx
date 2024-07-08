import React from 'react';
import { Tabs } from 'antd';
import "./index.scss"
import Demo1 from "./Demo1"

const Three = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: 'Demo1',
      label: 'demo - 可视化大屏',
      children: <Demo1></Demo1>,
    },
  ];
  return (
    <div className="Three">
      <Tabs 
        destroyInactiveTabPane
        centered
        className='Three-tabs'
        defaultActiveKey="FixedHeightWaterFallVirtualList" 
        items={items} 
        onChange={onChange} />
    </div>
  )
}

export default Three