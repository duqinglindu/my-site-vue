import request from "./request"
/**
请求首页数据 
 */
export async function getBannersData() {
    return await request.get("/api/banner");
}