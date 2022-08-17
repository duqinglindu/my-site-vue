import request from "./request"

/**
 * 获取博客分类
 */
export async function getBlogTypes() {
    return await request.get("/api/blogtype");
}

/**
 * 获取博客列表数据
 * categoryid 默认为-1 获取全部文章的分类
 * page: 默认第一页
 * limit： 默认10条数据
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
    return await request.get("/api/blog", {
        params: { //url参数
        page,
        limit,
        categoryid,
        },
    });
}

/**
 * 获取单个博客文章
 * `:id`为博客的id
 */
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`);
}

/**
 * 提交博客下的评论
 * @param commentInfo {
	nickname: "昵称",
	content: "评论内容，纯文本",
	blogId: <id>	#评论的博客id
}
 */
export async function postComment(commentInfo) {
    return await request.post("/api/comment", commentInfo);
}

/**
 * 分页获取所有评分 针对某一篇博客的所有评论
 * blogId 所属文章
 * page: 页码
 * limit: 页容量
 */
export async function getComments( blogId, page = 1, limit = 10) {
    return await request.get("/api/comment", {
        params: {
            blogId,
            page,
            limit,
        }
    })  
}