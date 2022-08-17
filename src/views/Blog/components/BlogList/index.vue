<template>
    <div class="blogList-container" v-loading="isLoading" ref="container">
        <!-- 文章列表 -->
        <ul>
            <li v-for="item in data.rows" :key="item.id">
            <!-- 图片可能有可能没有 -->
                <div class="thumb" v-if="item.thumb">
                    <router-link :to="{
                        name: 'BlogDetail',
                        params: {
                            id: item.id, //当前文章的id
                        }
                    }">
                        <img v-lazy="item.thumb" 
                        :alt="item.imgTitle"
                        :title="item.imgTitle">
                    </router-link>
                </div>
                <div class="main">
                    <router-link :to="{
                        name: 'BlogDetail',
                        params: {
                            id: item.id, 
                        }
                    }">
                        <!-- 标题 -->
                        <p>
                            {{item.title}}
                        </p>
                        <div class="aside">
                            <span>日期：{{getDate(item.createDate)}}</span>
                            <span>浏览：{{item.scanNumber}}</span>
                            <span>评论：{{item.commentNumber}}</span>
                            <span>{{item.category.name}}</span>
                        </div>
                        <div class="desc">
                            {{item.description}}
                        </div>
                    </router-link>
                </div>
            </li>
        </ul>
        <!-- 无数据的显示 不是加载数据中，且没有数据-->
        <Empty v-if="data.rows.length === 0 && !isLoading" />
        <!-- 分页组件 -->
        <Pager :current="routeInfo.page" :limit="routeInfo.limit" :total="data.total" @pageChange="handlePageChange" />
    </div>
</template>

<script>
import Pager from "@/components/Pager"
import fetchData from "@/mixins/fetchData"
import {getBlogs} from "@/api/blog"
import {getDate} from "@/utils"
import mainScroll from "@/mixins/mainScroll"
import Empty from "@/components/Empty"

export default {
    mixins: [fetchData({total: 0, rows: []}), mainScroll("container")],
    components: {
        Pager,
        Empty,
    },
    computed: {
        // 获取路由信息
        routeInfo() {
            // 文章分类
            const categoryId = +this.$route.params.categoryId || -1;
            // 可能没有categoryId 转成数字就是 nan  就取默然值-1获取所有文章
            // 第几页 没有就默认为第一页
            const page = +this.$route.query.page || 1;
            // 一页多少条数据
            const limit = +this.$route.query.limit || 10;
            return {
                categoryId,
                page,
                limit,
            }
        }
    },
    methods: {
        getDate,
        // 请求数据
        async fetchData() {
            return await getBlogs(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId);
        },
        handlePageChange(newPage){
            // 页面变化改变地址， 发送请求这里就不手动发请求了使用监控
            /*有两种可能跳转的路径 
                /blog?page=1&limit=5;  没有分类
                /blog/cate/2?page=1&limit=5; 有分类
            */
            const query = {
                page: newPage, //页码
                limit: this.routeInfo.limit, //页容量
            }
            if(this.routeInfo.categoryId === -1) {
                // 没有分类                      
                this.$router.push({    
                    name: "Blog", //跳转到
                    query,
                    // 最终生成的地址是将name对应的地址加上query中的参数
                    // 若router-link使用的也是命名路由进行跳转，配置对象与这里一样
                })
            } else {
                this.$router.push({
                    name: "BlogCategory",
                    params: {  //name对应的地址中有动态的部分 :categoryId 
                    // 通过params对象告诉地址中:categoryId 的值
                        categoryId: this.routeInfo.categoryId,
                    },
                    query,
                })
            }
        }
    },
    watch: {
        async $route() {
            this.isLoading = true;
            // 滚动高度设为 0 css: scroll-behavior: smooth; /**滚动条平滑过渡到某个位置 */
            this.$refs.container.scrollTop = 0;
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
    .blogList-container{
        position: relative;
        box-sizing: border-box;
        height: 100%;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        line-height: 1.7;
        scroll-behavior: smooth; /**滚动条平滑过渡到某个位置 */
        li{
            display: flex;
            align-items: flex-start;
            padding: 15px 0;
            border-bottom: 1px solid @gray;
            .thumb{
                flex: 0 0 auto;
                margin-right: 15px;
                img{
                    display: block;
                    max-width: 200px;
                    border-radius: 5px;
                }
            }
            .main{
                flex: 1 1 auto;
                p{
                    padding-top: 10px;
                    font-size: 23px;
                    font-weight: 600;
                    .textOverflow();
                }
                .aside{
                    font-size: 12px;
                    color: @gray;
                    span{
                        white-space: nowrap;
                        margin-right: 15px;
                    }
                }
                .desc{
                    margin: 15px 0;
                    .textOverflow(3);
                }
            }
        }
    }
</style>