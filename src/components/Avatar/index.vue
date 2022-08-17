<template>
<!--  头像组件 圆形 地址动态 大小动态-->
    <img class="avatar-container"
        :src="url" :style="{
        width: size + 'px',
        height: size + 'px',
    }" />
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            required: true, //必填
        },
        size: {
            type: Number,
            default: 150, //默认值
        }
    }
}
</script>

<style scoped>
    .avatar-container{
        border-radius: 50%;
        object-fit: cover;
        display: block;
    }
</style>