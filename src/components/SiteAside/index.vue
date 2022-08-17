<template>
<!-- 侧边栏组件 -->
    <div class="site-aside-container">
        <Avatar url="/dist/img/a" />
        <!-- <h1 class="title">Du is powerful。</h1> -->
        <!-- 
            这里一开始data为null，因为需要远程获取数据
        -->
        <h1 class="title">{{data? data.siteTitle: "du"}}</h1>
        <Menu />
        <Contact />
        <p class="footer">
            <!-- 川ICP备17001719号 -->
            {{data? data.icp: ""}}
        </p>
    </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import {mapState} from "vuex";

export default {
    components: {
        Avatar,
        Menu,
        Contact,
    },
    computed: mapState("setting", ["data"])
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container::-webkit-scrollbar{
    width: 0;
    height: 0;
}
.site-aside-container {
    height: 100%;
    background: @dark;
    padding: 20px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
}
h1{
    margin-top: 5px;
}
.avatar-container {
    margin: 0 auto;
}
.footer {
    text-align: center;
    font-size: 12px;
}
.title {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
}
</style>
