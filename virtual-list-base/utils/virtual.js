class FsVirtuallist {
  constructor(containerSelector, listSelector) {
    this.state = {
      dataSource: [], // 模拟数据源
      itemHeight: 100, // 固定 item 高度
      viewHeight: 0, // container 高度
      maxCount: 0, // 虚拟列表视图最大容纳量
    };
    this.scrollStyle = {}; // list 动态样式（高度，偏移）
    this.lastStartIndex = 0; // 保存上一次的 startIndex，初始化不能与 startIndex 一样，故设置为 -1
    this.startIndex = 0; // 当前视图列表在数据源中的起始索引
    this.endIndex = 0; // 当前视图列表在数据源中的末尾索引
    this.renderList = []; // 渲染在视图上的列表项
    // 根据用户传入的选择器获取 DOM 并保存
    this.oContainer = document.querySelector(containerSelector);
    this.oList = document.querySelector(listSelector);
  }

  init() {
    this.state.viewHeight = this.oContainer.offsetHeight;
    this.state.maxCount = Math.ceil(this.state.viewHeight / this.state.itemHeight) + 1;
    this.bindEvent();
    this.addData();
    this.render();
  }

  computedEndIndex() {
    const end = this.startIndex + this.state.maxCount;
    this.endIndex = end < this.state.dataSource.length ? end : this.state.dataSource.length;
    // 滚动加载更多
    if (this.endIndex >= this.state.dataSource.length) {
      this.addData();
    }
  }

  computedRenderList() {
    this.renderList = this.state.dataSource.slice(this.startIndex, this.endIndex);
  }

  computedScrollStyle() {
    const { dataSource, itemHeight } = this.state;
    this.scrollStyle = {
      height: `${dataSource.length * itemHeight - this.startIndex * itemHeight}px`,
      transform: `translateY(${this.startIndex * itemHeight}px)`,
    };
  }

  rafThrottle(fn) {
    let lock = false;
    return function (...args) {
      window.requestAnimationFrame(() => {
        if (lock) return;
        lock = true;
        fn.apply(this, args);
        lock = false;
      });
    };
  }

  bindEvent() {
    // 注意需要改变 this 指向 -> bind
    this.oContainer.addEventListener("scroll", this.rafThrottle(this.handleScroll.bind(this)));
  }
  
  handleScroll() {
    const { scrollTop } = this.oContainer;
    this.startIndex = Math.floor(scrollTop / this.state.itemHeight);
    // 比对更新
    if (this.startIndex !== this.lastStart){
      this.render();
      // 保存上一次的 startIndex
      this.lastStart = this.startIndex;
    }
  }

  render() {
    this.computedEndIndex();
    this.computedRenderList();
    this.computedScrollStyle();
    const template = this.renderList.map((i) => `<div class="fs-virtuallist-item">${i}</div>`).join("");
    const { height, transform } = this.scrollStyle;
    this.oList.innerHTML = template;
    this.oList.style.height = height;
    this.oList.style.transform = transform;
  }

  addData() {
    for (let i = 0; i < 10; i++) {
      this.state.dataSource.push(this.state.dataSource.length + 1);
    }
  }

}

export default FsVirtuallist
