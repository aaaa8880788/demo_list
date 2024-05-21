import React, { useEffect, useState, useRef, useMemo } from "react";
import { rafThrottle } from "@/utils/common";
import { Card, Image, Spin } from 'antd'
import mockData from './mockData'
import "./index.scss";
 
function FixedHeightVirtualList(){
  const containerRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    start: 0,
    viewHeight: 0,
    itemHeight: 220,
  });
  const [dataState, setDataState] = useState({
    loading: false,
    isFinish: false,
    dataSource: [],
    pageNumber: 1,
    pageSize: 5,
  })

  const [queueState, setQueueState] = useState({
    queue: { list: [], height: 0 },
    len: 0,
  });

  const [listStyle, setListStyle] = useState({});

  const addInQueue = (size = dataState.pageSize) => {
    const queue = queueState.queue;
    let len = queueState.len;
    for (let i = 0; i < size; i++) {
      const before = queue.list[queue.list.length - 1] || null;
      const dataItem = dataState.dataSource[len];
      if(!dataItem) {
        break;
      }
      const item = generatorItem(dataItem, before);
      queue.list.push(item);
      queue.height += item.h;
      len++;
    }
    setListStyle({ height: `${queue.height}px` });
    setQueueState({ queue, len });
  };

  const generatorItem = (item, before) => {
    const width = '100%';
    const height = scrollState.itemHeight;
    let y = 0;
    if (before) y = before.y + before.h;
    return {
      ...item,
      y,
      h: height,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate3d(0, ${y}px, 0)`,
      },
    };
  };

  useEffect(() => {
    addInQueue();
  }, [dataState.dataSource]);

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

  const end = useMemo(() => scrollState.viewHeight + scrollState.start, [scrollState]);

  const renderList = useMemo(
    () => queueState.queue.list.filter(item => item.h + item.y > scrollState.start && item.y < end),
    [queueState, end]
  )

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
    setScrollState({ ...scrollState, start: scrollTop });
    if (scrollTop + scrollState.viewHeight > scrollHeight - 10) {
      !dataState.loading && loadDataList();
    }
  });

  const initScrollState = () => {
    setScrollState({
      ...scrollState,
      viewHeight: containerRef.current.clientHeight,
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
    <div className="FixedHeightVirtualList global-wrapper">
        <div className="virtual-container global-container" ref={containerRef} onScroll={handleScroll}>
          <div className="virtual-list" style={listStyle}>
            {
              renderList.map(item => (
                <Card
                  className="virtual-item"
                  title={item.title} 
                  key={item.id}
                  extra={
                  <Image
                    width={100}
                    src={item.src} />
                  } 
                  style={item.style}>
                  <p>{item.content}</p>
                </Card>
              ))
            }
            </div>
        </div>
    </div>
  )
}
 
export default FixedHeightVirtualList