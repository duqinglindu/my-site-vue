
/**
模拟首页所需数据
 */
import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
  code: 0,
  msg: "",
  data: [
    {
      id: "1",
      midImg: "/dist/img/1.jpg",
      bigImg: "/dist/img/2.jpg",
      title: "凛冬将至",
      description: "人唯有恐惧的时候方能勇敢",
    },
    {
      id: "2",
      midImg: "/dist/img/3.jpg",
      bigImg: "/dist/img/4.jpg",
      title: "血火同源",
      description: "如果我回头，一切都完了",
    },
    {
      id: "3",
      midImg: "/dist/img/5.jpg",
      bigImg: "/dist/img/6.jpg",
      title: "听我怒吼",
      description: "兰尼斯特有债必偿",
    },
  ],
});
