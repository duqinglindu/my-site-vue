<template>
    <Layout>
        <div class="main-container" v-loading="isLoading" ref="mainContainer">
            <BlogDetail :blog="data" v-if="data" />
            <BlogComment v-if="!isLoading" />
        </div>
        <template #right>
            <div class="right-container" v-loading="isLoading">
                <BlogToc :toc="data.toc" v-if="data" />
            </div>
        </template>
    </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData"
import {getBlog} from "@/api/blog"
import Layout from "@/components/Layout"
import BlogDetail from "./components/BlogDetail"
import BlogToc from "./components/BlogToc"
import BlogComment from "./components/BlogComment"
import mainScroll from "@/mixins/mainScroll"
import setTitle from "@/utils/setTitle"

export default {
    mixins: [fetchData(), mainScroll("mainContainer")],
    components: {
        Layout,
        BlogDetail,
        BlogToc,
        BlogComment,
    },
    updated() { //在组件更新时
        const hash = location.hash;  //保存之前的hash值
        location.hash = "";
        setTimeout(()=> { //等浏览器重新渲染后
        location.hash = hash;
        }, 50)
    },
    methods: {
        async fetchData() {
            // 拿取文章
            const resp =  await getBlog(this.$route.params.id);
            if(!resp) {
                // 文章不存在, 跳转到404页面。 
                this.$router.push("/404/"); //随便给了一个不存在的地址
                return;
            }
            setTitle.setRouteTitle(resp.title); //设置标题
            return resp;
        },
        // handleScroll() {
        //     // 主区域滚动事件
        //     this.$bus.$emit("mainScroll", this.$refs.mainContainer);
        // },
        // handleSetMainScroll(scrollHeight) {
        //     this.$refs.mainContainer.scrollTop = scrollHeight;
        // }
    },
    // mounted() {
    //     this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
    // },
    // beforeDestroy() {
    //     this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
    //     // 组件销毁时 告诉回到顶部组件 将其隐藏
    //     this.$bus.$emit("mainScroll"); //传入undefined表示dom元素已经被销毁了
    //     this.$bus.$off("setMainScroll", this.handleSetMainScroll);
    // },
    // created() {
    //     this.$bus.$on("setMainScroll", this.handleSetMainScroll);
    // },
}
</script>

<style scoped lang="less">
    .main-container {
        overflow-y: auto;
        height: 100%;
        box-sizing: border-box;
        padding: 20px;
        position: relative;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }
    .right-container {
        width: 300px;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        position: relative;
        padding: 20px;
    }
</style>