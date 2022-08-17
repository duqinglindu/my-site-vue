import request from "./request"
/**
请求首页数据 
 */
export async function getAbout() {
    return await request.get("/api/about");
}