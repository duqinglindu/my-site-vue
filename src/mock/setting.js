/**
 * 网站的全局设置
 */
import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://img2.baidu.com/it/u=1713796643,4188877777&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660755600&t=3041c21aa87f2e1389d5572d0bfe2ed1",
    siteTitle: "我的个人空间",
    github: "https://github.com/duqinglindu",
    qq: "3263023350",
    qqQrCode:
      "https://img2.baidu.com/it/u=1713796643,4188877777&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660755600&t=3041c21aa87f2e1389d5572d0bfe2ed1",
    weixin: "yh777bao",
    weixinQrCode:
      "https://img2.baidu.com/it/u=1713796643,4188877777&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1660755600&t=3041c21aa87f2e1389d5572d0bfe2ed1",
    mail: "duqinglin@gmail.com",
    icp: "川ICP备17001719号",
    githubName: "du",
    favicon: "/dist/img/icon",
  },
});
