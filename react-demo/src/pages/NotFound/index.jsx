import React from 'react';
import BgNotFound from "@/assets/bg_404.png";

const NotFound = () => {
  return (
    <div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img width={200} height={140} src={BgNotFound} />
    </div>
  );
};
export default NotFound;