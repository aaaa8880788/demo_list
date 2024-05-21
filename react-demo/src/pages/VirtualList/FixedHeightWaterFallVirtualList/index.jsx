import React,{ useEffect, useMemo, useRef, useState } from "react";
import Waterfall from "./components/Waterfall";
import { debounce } from "@/utils/common";
import "./index.scss";
 
function WaterFallList(){
  const wrapperRef = useRef(null);
  const [dataState, setDataState] = useState({
    column: 5,
    pageSize: 25,
    gap: 5,
  })
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
        title: generateMockData(5,10),
        content: generateMockData(50,100),
        star: Math.ceil(Math.random() * 100),
      }));
    }
    return list;
  };

  const generateMockData = (start = 30, end = 200) => {
    const characters = '千仞雪是斗罗大陆上年轻人一代中最顶尖的两位天才之一虽然天赋和唐三比肩但是因为她小时候在天斗皇宫潜伏了多年错过了最佳的修炼时间导致她的天赋优势并没有发挥出来千仞雪的先天魂力二十级这种天赋的优势是魂力提升速度快在错过黄金修炼期千仞雪也就没办法在魂力上和唐三拉开差距'; // 26个小写字母
    const valueLength = Math.floor(Math.random() * (end + 1)) + start; // 长度为 30-200 之间的随机数
    let randomString = '';
    for (let j = 0; j < valueLength; j++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString
  };

  const changeColumn = (width) => {
    const state = {
      ...dataState
    }
    if(width > 1200) {
      state.column = 5;
    } else if(width > 1000 && width <= 1200) {
      state.column = 4;
    } else {
      state.column = 3;
    }
    setDataState(state)
  };

  const handleResize = debounce(() => {
    console.log('wrapperRef.current.clientWidth------', wrapperRef.current.clientWidth);
    changeColumn(wrapperRef.current.clientWidth)
  })

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return (
    <div className="WaterFallList">
      <div className="virtualList-wrapper" ref={wrapperRef}>
        <Waterfall request={req} {...dataState}>
          {(detail) => (
            <div className="card-item">
              <div className="card-item-image">
                <img src={detail.src} />
              </div>
              <div className="card-item-footer">
                <div className="title">{ detail.title }</div>
                <div className="author">
                  <div className="author-info">
                    <img src={detail.src} className="avatar" />
                    <span className="name">{ detail.content }</span>
                  </div>
                  <div className="like">{ detail.star }</div>
                </div>
              </div>
            </div>
          )}
        </Waterfall>
      </div>
    </div>
  )
}
 
export default WaterFallList