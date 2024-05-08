import React from 'react';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const NavigatePage = () => {
  const navigate = useNavigate();
  const handleBtnClick = (type) => {
    switch (type) {
      case "不定高虚拟列表":
        navigate('/FixedHeightVirtualList')
        break;
    
      default:
        break;
    }
  }
  return (
    <div className='navigatePage'>
      <Button type="primary" onClick={() => handleBtnClick("不定高虚拟列表")}>不定高虚拟列表</Button>
    </div>
  )
}

export default NavigatePage