<template>
    <div @click="handleClick" class="toTop-container" v-show="show">
        <!-- 回到顶部插件 -->
        Top
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false, //是否显示回到顶部
        }
    },
    created() {
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed() {
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    methods: {
        handleScroll(dom) {
            if(!dom) { //在ToTop组件中 没有dom元素(区域没有了)就不显示组件->在切换页面时防止该组件没有消失
                this.show = false;
                return;
            }
            this.show = dom.scrollTop >= 500; //滚动该位置时才出现滚动条
        },
        handleClick() {
            // 点击回到顶部     将主区域的dom的滚动高度设置为0 这里触发一个事件 而不是直接设置主区域的滚动高度
            // 不建议直接操作主区域dom元素  触发一个事件
            this.$bus.$emit("setMainScroll", 0);
        },
    },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
    .toTop-container{
        background: @primary;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: fixed;
        z-index: 99;
        right: 50px;
        bottom: 50px;
        cursor: pointer;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }
</style>