<template>
<!--文章分类列表  -->
    <div class="blogCategory-container" v-loading="isLoading">
        <h3>文章分类</h3>
        <RightList :list="list" @select="handleSelect" />
    </div>
</template>

<script>
import fetchData from "@/mixins/fetchData"
import {getBlogTypes} from "@/api/blog"
import RightList from "../RightList"

export default {
    mixins: [fetchData([])],
    components: {
        RightList,
    },
    computed: {
        routeInfo() {
            // 文章分类
            const categoryId = +this.$route.params.categoryId || -1;
            // 可能没有categoryId 转成数字就是 nan  就取默然值-1获取所有文章
            // 一页多少条数据
            const limit = +this.$route.query.limit || 10;
            return {
                categoryId,
                limit,
            }
        },
        list() {
            // 根据现有数据得到新的数据
            const total = this.data.reduce((a, b) => a + b.articleCount, 0)
            const result = [
                {name: "全部", id: -1, articleCount: total},
                ...this.data,
            ]
            return result.map(it => ({
                ...it,
                isSelect: it.id === this.routeInfo.categoryId,
                aside: `${it.articleCount}篇`,
            }))
        }
        
    },
    methods: {
        async fetchData() {
            return await getBlogTypes();
        },
        handleSelect(item) {
            const query = {
                page: 1,
                limit: this.routeInfo.limit,
            };
            // 跳转到 当前的分类id  当前的页容量  newPage的页码
            if (item.id === -1) {
                this.$router.push({
                    name: "Blog",
                    query,
                });
            } 
            else {
                this.$router.push({
                    name: "BlogCategory",
                    query,
                    params: {
                        categoryId: item.id,
                    },
                });
            }
        },
    }
}
</script>

<style scoped lang="less">
    .blogCategory-container{
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        overflow-y: auto;
        h3{
            font-size: 1em;
            letter-spacing: 2px;
            font-weight: 600;
            padding-bottom: 10px;
        }
    }
</style>