<template>
    <div class="test-container">
        <Layout>
            <template #left>
                <div class="left">left</div>
            </template>
            <template>
                <div>main</div>
            </template>
            <template #right>
                <div class="right">right</div>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from "./";
import "@/styles/global.less";
export default {
    components: {
        Layout,
    }
}
</script>

<style scoped>
    .test-container{
        width: 1000px;
        height: 600px;
    }
    .left{
        width: 200px;
        height: 100%;
        background: coral;
    }
    .right{
        width: 150px;
        height: 100%;
        background: cornflowerblue;
    }
</style>