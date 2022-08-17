function myConsoleLog(r, msg) {
    console.log(`%c${msg}`, "color:#008c8c");
    console.log(r);
}

/**
测试数据是否接收到
 */

//  首页
import {getBannersData} from "./banner"
getBannersData().then(r => myConsoleLog(r, "首页"));

//博客
import {getBlogTypes, getBlogs, getBlog, postComment, getComments} from "./blog"
/**
 * 获取博客分类
 */
getBlogTypes().then(r => myConsoleLog(r, "博客分类"));

/**
 * 获取博客列表数据
 */
getBlogs(null, 5).then(r => myConsoleLog(r, "博客列表数据"));

/**
 * 获取单个博客文章
 */
getBlog("h_123").then(r => myConsoleLog(r, "单个博客文章"));

/**
 * 提交博客下的评论
 */
postComment({
    nickname: "123abc",
    content: "12345....",
    blogId: "h_123",
}).then(r => myConsoleLog(r, "提交博客下的评论"));

/**
 * 分页获取所有评分 针对某一篇博客的所有评论
 */
getComments("h_123").then(r => myConsoleLog(r, "分页获取所有评分"));

/**
 * 全局设置
 */
import { getSetting } from "./setting";
getSetting().then(r => myConsoleLog(r, "全局设置"));