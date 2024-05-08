import React from 'react';
import Icon from '@ant-design/icons';

const MenuIcon = (props) => {
  const { src, style } = props
  return (
    <Icon component={src} style={{ ...style }} />
  )
}

export default MenuIcon;