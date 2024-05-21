import React, { useEffect, useState, useRef } from "react";
import { rafThrottle } from "@/utils/common";
import { Card, Image, Spin } from 'antd'
import mockData from './mockData'
import "./index.scss";
 
function BaseList(){
  const containerRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    containerHeight: 0,
    itemHeight: 220,
  });
  const [dataState, setDataState] = useState({
    loading: false,
    isFinish: false,
    dataSource: [],
    pageNumber: 1,
    pageSize: 5,
  })

  const request = (pageNumber, pageSize) => {
    return new Promise((resolve, reject) => {
      if((pageNumber - 1) * pageSize > mockData.length) {
        return resolve([])
      }
      const mockDataList = mockData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize > mockData.length ? mockData.length : pageNumber * pageSize);
      setTimeout(() => {
        resolve(mockDataList);
      }, 1500)
    }) 
  };

  const loadDataList = async () => {
    if (dataState.isFinish || dataState.loading) return;
    setDataState({ ...dataState, loading: true });
    const list = await request(dataState.pageNumber++, dataState.pageSize);
    console.log('list------', list);
    if (!list.length) {
      setDataState({ ...dataState, isFinish: true, loading: false });
      return;
    }
    setDataState({ ...dataState, dataSource: [...dataState.dataSource, ...list], loading: false });
    return list.length;
  }

  const handleScroll = rafThrottle(() => {
    const { scrollTop, scrollHeight } = containerRef.current;
    if (scrollTop + scrollState.containerHeight > scrollHeight - 10) {
      !dataState.loading && loadDataList();
    }
  });

  const initScrollState = () => {
    setScrollState({
      containerHeight: containerRef.current.clientHeight,
    });
  };

  const init = async() => {
    initScrollState();
    await loadDataList();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="BaseList global-wrapper">
        <div className="virtual-container global-container" ref={containerRef} onScroll={handleScroll}>
          <div className="virtual-list">
            {
              dataState.dataSource.map(item => (
                <Card
                  className="virtual-item"
                  title={item.title} 
                  key={item.id}
                  extra={
                  <Image
                    width={100}
                    src={item.src} />
                  } 
                  style={{ margin: '10px', height: scrollState.itemHeight }}>
                  <p>{item.content}</p>
                </Card>
              ))
            }
            </div>
        </div>
    </div>
  )
}
 
export default BaseList