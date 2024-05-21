import React from "react";
import VirtualWaterfall from "./components/VirtualWaterfall";
import "./index.scss";
 
function FixedHeightVirtualList(){
  const req = async (tpage, size) => {
    // 请求，并传入分页参数
    const request = await fetch(
      `https://www.vilipix.com/api/v1/picture/public?limit=${size}&sort=hot&offset=${tpage * size}`
    );
    let list = [];
    if(request.ok) {
      let {
        data,
      } = await request.json();
      console.log('data------', data);
      // 数据处理
      list = data.rows.map((item) => ({
        id: item.picture_id,
        width: item.width,
        height: item.height,
        src: item.regular_url + "?x-oss-process=image/resize,w_240/format,jpg",
      }));
    }
    return list;
  };

  return (
    <div className="FixedHeightWaterFallVirtualList">
      <div className="virtualList-wrapper">
        <VirtualWaterfall request={req} column={5} pageSize={25} gap={15}>
          {(detail) => (
            <div className="card-item">
              <img src={detail.src} />
            </div>
          )}
        </VirtualWaterfall>
      </div>
    </div>
  )
}
 
export default FixedHeightVirtualList