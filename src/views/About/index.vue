<template>
<!-- ajax请求中，或网页加载中都要显示loading -->
    <div class="about-container" v-loading="loading || !isLoad">
        <iframe 
        @load="isLoad=true" v-if="src"
        :src="src" frameborder="0" class="about-content"></iframe>
        <!-- 等有数据了之后再显示
        这里有一个小的问题，因为连接的是外部网站，可能网站加载的很慢，我们希望在网站完全加载
        完成之前一直显示loading效果，而不是只是在拿数据阶段显示loading,因此我们加了一个isLoad
        -->
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {    
    data() {
        return {
            isLoad: false,
        }
    },
    computed: mapState("about", {
        src: "data",  //取出data数据 ，同时用的时候换一个名字
        loading: "loading",
    }),
    created() {
        // 更新一下数据
        this.$store.dispatch("about/fetchAbout"); 
    }
}
</script>

<style scoped lang="less">
    .about-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .about-content{
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }
</style>    