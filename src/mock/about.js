import Mock from "mockjs";

Mock.mock("/api/about", "get", {
    code: 0,
    msg: "",
    data: "https://map.baidu.com/@11585280.82,3555907.48,12z"
})