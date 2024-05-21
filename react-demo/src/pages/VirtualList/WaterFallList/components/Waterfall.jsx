import React,{ useEffect, useMemo, useRef, useState } from "react";
import { rafThrottle } from "@/utils/common";
import "./Waterfall.scss"

const Waterfall = (props) => {
  const containerRef = useRef(null);
  useEffect(() => {
    init();
  }, []);

  const [dataState, setDataState] = useState({
    loading: false,
    isFinish: false,
    currentPage: 1,
    list: [],
  });

  const [scrollState, setScrollState] = useState({
    viewWidth: 0,
    viewHeight: 0,
    start: 0,
  });

  const [queueState, setQueueState] = useState({
    queue: new Array(props.column).fill(0).map(() => ({ list: [], height: 0, preLenght: 0 })),
    len: 0,
  });

  const [listStyle, setListStyle] = useState({});

  const itemSizeInfo = useMemo(() => {
    return dataState.list.reduce((pre, current) => {
      const itemWidth = Math.floor((scrollState.viewWidth - (props.column - 1) * props.gap) / props.column);
      pre.set(current.id, {
        width: itemWidth,
        height: Math.floor((itemWidth * current.height) / current.width),
      });
      return pre;
    }, new Map());
  }, [dataState.list]);

  const computedRealDomPos = () => {
    console.log("computedRealDomPos------", computedRealDomPos);
  }

  useEffect(() => {
    if(itemSizeInfo.size) {
      addInQueue();
    }
  }, [itemSizeInfo]);

  const cardList = useMemo(
    () => queueState.queue.reduce((pre, { list }) => pre.concat(list), []),
    [queueState]
  );

  const computedHeight = () => {
    let minIndex = 0,
    minHeight = Infinity,
    maxHeight = -Infinity;
    queueState.queue.forEach(({ height }, index) => {
      if (height < minHeight) {
        minHeight = height;
        minIndex = index;
      }
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    setListStyle({ height: `${maxHeight}px` });
    return {
      minIndex,
      minHeight,
    };
  };

  const addInQueue = (size = props.pageSize) => {
    const queue = queueState.queue;
    let len = queueState.len;
    queue.forEach(item => {
      item.preLenght = item.list.length;
    })
    for (let i = 0; i < size; i++) {
      const minIndex = computedHeight().minIndex;
      const currentColumn = queue[minIndex];
      const before = currentColumn.list[currentColumn.list.length - 1] || null;
      const dataItem = dataState.list[len];
      const item = generatorItem(dataItem, before, minIndex);
      currentColumn.list.push(item);
      currentColumn.height += item.height;
      len++;
    }
    setQueueState({ queue: [...queue], len });
  };

  const generatorItem = (item, before, index) => {
    const rect = itemSizeInfo.get(item.id);
    const width = rect.width;
    const height = rect.height;
    let y = 0;
    if (before) {
      y = before.y + before.height + props.gap;
    }
    const x = index === 0 ? 0 : (width + props.gap) * index
    return {
      item,
      height: height + 75, // (75为footer的高度)
      width,
      x,
      y,
      style: {
        width: `${width}px`,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      },
    };
  };

  const loadDataList = async () => {
    if (dataState.isFinish) return;
    setDataState({ ...dataState, loading: true });
    const list = await props.request(dataState.currentPage++, props.pageSize);
    if (!list.length) {
      setDataState({ ...dataState, isFinish: true });
      return;
    }
    setDataState({ ...dataState, list: [...dataState.list, ...list], loading: false });
    return list.length;
  };

  const handleScroll = rafThrottle(() => {
    const { scrollTop, clientHeight } = containerRef.current;
    setScrollState({ ...scrollState, start: scrollTop });
    if (scrollTop + clientHeight > computedHeight().minHeight) {
      !dataState.loading && loadDataList();
    }
  });

  const initScrollState = () => {
    setScrollState({
      viewWidth: containerRef.current.clientWidth,
      viewHeight: containerRef.current.clientHeight,
      start: containerRef.current.scrollTop,
    });
  };

  const init = async () => {
    initScrollState();
    await loadDataList();
  };

  return (
    <div className="Waterfall" ref={containerRef} onScroll={handleScroll}>
      <div className="Waterfall-list" style={listStyle}>
        {cardList.map(({ item, style }) => (
          <div className="Waterfall-item" key={item.id} style={style}>
            {props.children(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Waterfall;