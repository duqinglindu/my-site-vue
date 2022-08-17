
/**
 * 页面主区域 滚动时 触发的事件相关处理
 */
export default function(refValue) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
        },
        methods: {
            handleMainScroll() {
                // 主区域滚动事件
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
            handleSetMainScroll(scrollHeight) {
                this.$refs[refValue].scrollTop = scrollHeight;
            }
        },
        beforeDestroy() {
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
            // 组件销毁时 告诉回到顶部组件 将其隐藏
            this.$bus.$emit("mainScroll"); //传入undefined表示dom元素已经被销毁了
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
        },
    };
}