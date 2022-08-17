<template>
<!-- 图片预加载 -->
    <div class="imageLoader-container">
        <img :src="src" @load="load">
        <img 
            v-if="!vanish"
            :src="placeholder"
            :style="{
                opacity: stanceOp,
                transition: `opacity ${duration}ms`,
            }">
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOk: false, //图片是否加载完成
            vanish: false, //占位图是否消失
        }
    },
    computed: {
        stanceOp() { //占位图的透明度
            return this.isOk ? "0" : "1"; 
        }
    },
    props: {
        src: { // 原始图片路径
            type: String,
            require: true,
        },
        placeholder: { //占位图路径
            type: String,
            require: true,
        },
        duration: { //原始图加载完成后切换到该图片的毫秒数
            type: Number,
            default: 1000,
        }
    },
    methods: {
        load() {
            this.isOk = true;
            setTimeout(() => {
                this.vanish = true;
                this.$emit("load");
            }, this.duration)
        },
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
    .imageLoader-container{
        height: 100%;
        position: relative;
        img{
            object-fit: cover;
            .self-fill();
        }
    }
</style>