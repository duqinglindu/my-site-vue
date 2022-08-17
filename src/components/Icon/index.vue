<template>
    <!-- 图标组件 -->
    <i class="iconfont icon-container" :class="fontClass"/>
</template>

<script>
// 根据传递的图标类型,得到相应的图标类
const classMap = {
    home: "icon-zhuye",
    github: "icon-github",
    arrowDown: "icon-xiajiantou-cu",
    arrowUp: "icon-shangjiantou-cu",
    noData: "icon-wushuju",
    qq: "icon-QQ",
    weChat: "icon-weixin",
    mail: "icon-youjian",
    blog: "icon-24",
    about: "icon-guanyuwo",
    code: "icon-xiangmu",
    chat: "icon-liuyanban-05",
    info: "icon-info",
    error: "icon-error",
    warn: "icon-warning",
    success: "icon-Success",
}
export const typesArr = Object.keys(classMap);
export default {
    props: {
        type: {
            type: String,
            require: true,
        }
    },
    computed: {
        // 图标的类样式
        fontClass() {
            return classMap[this.type];
        }
    }
}
</script>

<style scoped>
    @import "//at.alicdn.com/t/font_2953049_7e6cftw1bgc.css";
    .icon-container{
        font-size: inherit;
        color: inherit;
    }
</style>