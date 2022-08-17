<template>
<!-- 三栏布局组件 左右宽度适应内容，中间占满剩余宽度 -->
    <div class="layout-container">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="main">
            <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .layout-container{
        width: 100%;
        height: 100%;
        display: flex;
        .left, .right{
            flex: 0 0 auto;
            overflow: hidden;
        }
        .main{
            flex: 1 1 auto;
            overflow: hidden;
        }
    }
</style>