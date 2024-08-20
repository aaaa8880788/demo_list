import React from 'react';
import { Tabs } from 'antd';
import "./index.scss"
// import Demo1 from "./Demo1"
// import Demo1 from "./01-three.js入门/1.1-坐标辅助器与轨道控制器";
// import Demo1 from "./01-three.js入门/1.2-物体位移与父子元素";
// import Demo1 from "./01-three.js入门/1.3-物体的缩放与旋转";
import Demo1 from "./01-three.js入门/1.4-正确处理动画运动";

const Three = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: 'Demo1',
      label: 'demo - three.js',
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