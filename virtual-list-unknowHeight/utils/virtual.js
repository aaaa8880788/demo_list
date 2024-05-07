class FsVirtuallist {
  constructor(containerSelector, listSelector) {
    this.state = {
      dataSource: [], // 模拟数据源
      initItemHeight: 50, // 预测 item 高度
      viewHeight: 0, // container 高度
      listHeight: 0, // 列表高度
      maxCount: 0, // 虚拟列表视图最大容纳量
    };
    this.positions = [], // 数据源位置信息
    this.scrollStyle = {}; // list 动态样式（高度，偏移）
    this.lastStartIndex = 0; // 保存上一次的 startIndex，初始化不能与 startIndex 一样，故设置为 -1
    this.startIndex = 0; // 当前视图列表在数据源中的起始索引
    this.endIndex = 0; // 当前视图列表在数据源中的末尾索引
    this.renderList = []; // 渲染在视图上的列表项
    // 根据用户传入的选择器获取 DOM 并保存
    this.oContainer = document.querySelector(containerSelector);
    this.oList = document.querySelector(listSelector);
  }

  initPosition() {
    const positon = [];
    this.state.dataSource.forEach(item => {
      positon.push({
        id: item.id,
        index: item.index,
        height: this.state.initItemHeight, // 使用预测高度先填充 positions
        top: item.index * this.state.initItemHeight,
        bottom: (item.index + 1) * this.state.initItemHeight,
        dHeight: 0,
      })
    })
    this.positions = positon
  }

  init() {
    this.state.viewHeight = this.oContainer.offsetHeight || 0;
    this.state.maxCount = Math.ceil(this.state.viewHeight / this.state.initItemHeight) + 1;
    this.addData();
    this.initPosition();
    this.bindEvent();
    this.render();
  }

  setPosition() {
    const nodes = this.oList?.children;
    if (!nodes || !nodes.length) return;
    [...nodes].forEach((node) => {
      const rect = node.getBoundingClientRect();
      const item = this.positions[node.getAttribute("index")]; // string => number
      const dHeight = item.height - rect.height; // 预测 item 高度与真实 item 高度的差值
      if (dHeight) {
        item.height = rect.height;
        item.bottom = item.bottom - dHeight;
        item.dHeight = dHeight;
      }
    });
    // start item ~ end item 处理
    const startIndex = +nodes[0].getAttribute("index");
    const len = this.positions.length;
    // startHeight 作为 dHeight 的累计值
    let startHeight = this.positions[startIndex].dHeight;
    this.positions[startIndex].dHeight = 0;
    for (let i = startIndex + 1; i < len; i++) {
      const item = this.positions[i];
      item.top = this.positions[i - 1].bottom;
      item.bottom = item.bottom - startHeight;
      if (item.dHeight !== 0) {
        startHeight += item.dHeight;
        item.dHeight = 0;
      }
    }
    // 设置 list 高度
    this.state.listHeight = this.positions[len - 1].bottom;
  }

  computedListHeight() {
    this.setPosition();
  }

  computedEndIndex() {
    const end = this.startIndex + this.state.maxCount;
    this.endIndex = end < this.state.dataSource.length ? end : this.state.dataSource.length;
  }

  computedRenderList() {
    this.renderList = this.state.dataSource.slice(this.startIndex, this.endIndex);
  }

  computedOffsetDis() {
    return this.startIndex > 0 ? this.positions[this.startIndex - 1].bottom : 0
  }

  computedScrollStyle() {
    const offsetDis = this.computedOffsetDis();
    this.scrollStyle = {
      height: `${this.state.listHeight - offsetDis}px`,
      transform: `translateY(${offsetDis}px)`,
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
    this.oContainer.addEventListener("scroll", this.rafThrottle(() => this.handleScroll()));
  }
  
  handleScroll() {
    const { scrollTop } = this.oContainer;
    this.startIndex = this.binarySearch(this.positions, scrollTop);
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
    this.computedListHeight()
    this.computedScrollStyle();
    const template = this.renderList.map((i) => `<div class="fs-estimated-virtuallist-list-item" index=${i.index}>${i.value}</div>`).join("");
    const { height, transform } = this.scrollStyle;
    this.oList.innerHTML = template;
    this.oList.style.height = height;
    this.oList.style.transform = transform;
  }

  addData() {
    for (let i = 0; i < 20; i++) {
      this.state.dataSource.push({
        id: this.state.dataSource.length + 1,
        index: this.state.dataSource.length,
        value: `${this.state.dataSource.length}：${this.generateMockData()}`,
      });
    }
  }

  generateMockData(){
    const characters = 'abcdefghijklmnopqrstuvwxyz'; // 26个小写字母
    const valueLength = Math.floor(Math.random() * 401) + 100; // 长度为 100-500 之间的随机数
    let randomString = '';
    for (let j = 0; j < valueLength; j++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString
  };

  binarySearch(list, value) {
    let left = 0,
    right = list.length - 1,
    templateIndex = -1;
    while (left <= right) {
      const midIndex = Math.floor((left + right) / 2);
      const midValue = list[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      }else if (midValue < value){
        left = midIndex + 1;
        templateIndex = midIndex
      }else if (midValue > value) {
        right = midIndex - 1;
        templateIndex = midIndex === 0 ? midIndex : midIndex- 1
      }
    }
    return templateIndex;
  };
}

export default FsVirtuallist
