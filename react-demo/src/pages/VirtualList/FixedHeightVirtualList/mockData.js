import Avatar from "@/assets/IMG_3979.GIF"
const generateMockData = () => {
  const characters = '千仞雪是斗罗大陆上年轻人一代中最顶尖的两位天才之一虽然天赋和唐三比肩但是因为她小时候在天斗皇宫潜伏了多年错过了最佳的修炼时间导致她的天赋优势并没有发挥出来千仞雪的先天魂力二十级这种天赋的优势是魂力提升速度快在错过黄金修炼期千仞雪也就没办法在魂力上和唐三拉开差距'; // 26个小写字母
  const valueLength = Math.floor(Math.random() * 201) + 30; // 长度为 30-200 之间的随机数
  let randomString = '';
  for (let j = 0; j < valueLength; j++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString
};

let mockDataList = [];
let mockDataCount = 1000;
for (let i = 0; i < mockDataCount; i++) {
  mockDataList.push({
    id: i + 1,
    src: Avatar,
    title: "孩子卷不动了",
    content: generateMockData()
  })
}

export default mockDataList;