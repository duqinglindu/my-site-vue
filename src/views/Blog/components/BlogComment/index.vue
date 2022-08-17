<template>
    <div class="blogComment-container" id="message-container">
        <MessageArea 
            totalTitle="点评一下吧" 
            listTitle="评论列表"
            :subListTitle="data.total"
            :list="data.rows"
            :isListLoading="isLoading"
            @submit="handleSubmit"
        />
    </div>
</template>

<script>
import MessageArea from "@/components/MessageArea"
import fetchData from "@/mixins/fetchData"
import {getComments, postComment} from "@/api/blog"

export default {
    components: {
        MessageArea,
    },
    // total: 评论总数 rows: 评论列表
    mixins: [fetchData({total: 0, rows: []})],
    data() {
        return {
            // 这里的分页列表不是通过地址栏参数来确定是第几页，多少条数据
            // 所以这里通过通过数据记录下
            page: 1,
            limit: 10,
        }
    },
    computed: {
        hasMore() {
            return this.data.rows.length < this.data.total; //当前的数据是否达到了总数据量
        },
    },
    methods: {
        async fetchData() {
            /* 
            得到数据总量total 当前页的数据数组 rows
            */
            return await getComments(this.$route.params.id, this.page, this.limit);
        },
        async handleSubmit(formData, callBack) {
            const resp = await postComment({
                blogId : this.$route.params.id,
                ...formData,
            })
            this.data.rows.unshift(resp);
            this.data.total ++;
            callBack();     //通知子组件， 处理完成
        },
        // 加载下一页 把请求到的新数据加到当前的数组，数组内容变多了组件就会重新渲染
        async fetchMore() {
            if(!this.hasMore) {
                // 没有更多的数据
                return;
            }
            this.isLoading = true; //loading效果
            this.page ++;  //当前页面加一
            const resp = await this.fetchData(); //进行ajax请求下一页的数据
            this.data.total = resp.total;
            this.data.rows = this.data.rows.concat(resp.rows); //加到当前的数组中去
            this.isLoading = false;
        },
        handleScroll(dom) {
            // 滚动到底部加载数据 或者没有区域元素时
            if(this.isLoading || !dom) {
                // 目前正在加载数据
                return;
            }
            const range = 100;
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            // 滚动条滚动到指定的位置再加载数据  判断是否滚动到了底部
            if(dec <= range) {
                this.fetchMore(); //加载数据
            }
        },
    },
    created() {
        // 监听主区域的滚动条，判断是否加载评论列表
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed() {
        this.$bus.$off("mainScroll", this.handleScroll);
    },
}
</script>

<style scoped>
    .blogComment-container{
        padding: 30px 0 0;
    }
</style>