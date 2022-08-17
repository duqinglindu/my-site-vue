<template>
<!-- 图片预加载 -->
    <div class="imageLoader-container">
        <img :src="src" @load="load">
        <img 
            v-if="opacity"
            :src="placeholder"
            :style="{
                opacity,
            }">
    </div>
</template>

<script>
export default {
    data() {
        return {
            opacity: 1,
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
            default: 500,
        }
    },
    methods: {
        load() {
            let timer;
            timer = setInterval(() => {
                this.opacity -= 0.1;
                if(this.opacity < 0) {
                    this.opacity = 0;
                    clearInterval(timer);
                    this.$emit("load");
                }
            }, this.duration / 10)
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