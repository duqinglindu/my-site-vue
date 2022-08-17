<template>
<!-- 全屏滚动轮播图 -->
    <div class="home-container" ref="container" 
        @wheel="handleWheel"
        v-loading="loading">
        <div class="carousel-container" 
            :style="{
                height: setCarouselHeight,
                transform: `translateY(${translateY})`,
            }"
            @transitionend="handleTransitionEnd"
        >
            <CarouselItem 
            v-for="item in data" :key="item.id"
            :carousel="item"
            :height="containerHeight + 'px'"
            />
        </div>

        <div class="icon icon-up" 
            v-show="index >= 1"
            @click="switchTo(index - 1)">
            <Icon type="arrowUp" />
        </div>
        <div class="icon icon-down"
            v-show="index < data.length - 1"
            @click="switchTo(index + 1)">
            <Icon type="arrowDown" />
        </div>

        <ul class="indicator">
            <li  
            v-for="(item, i) in data" :key="item.id"
            :class="{
                active: i === index
            }"
            @click="switchTo(i)"
            />
        </ul>
    </div>
</template>

<script>
// import {getBannersData} from '@/api/banner'
import CarouselItem from "./CarouselItem"
import Icon from "@/components/Icon"
// import fetchData from "@/mixins/fetchData"
/* 
首页改用仓库中的数据
*/
import {mapState} from "vuex"


export default {
    // mixins: [fetchData([])],
    components: {
        CarouselItem,
        Icon
    },
    data() {
        return {
            index: 0, //当前展示第几张
            containerHeight: 0, //父容器的高度
            switching: false, // 是否在滚动中
        }
    },
    created() {
        // 在首页加载的时候就拿取首页的数据， 会尝试改变仓库的状态
        this.$store.dispatch("banner/fetchBanner");
    },
    mounted() {
        this.setContainerHeight();
        // 响应式
        window.addEventListener("resize", this.setContainerHeight);
    },
    destroyed() {
        window.removeEventListener("resize", this.setContainerHeight);
    },
    computed: {
        // 高度
        setCarouselHeight() {
            return this.data.length * this.containerHeight + "px";
        },
        // 位置
        translateY() {
            return -this.index * this.containerHeight + "px";
        },
        ...mapState("banner", ["data", "loading"]),
    },
    methods: {
        // async fetchData() {
        //     return await getBannersData();
        // },
        setContainerHeight() {
            this.containerHeight = this.$refs.container.clientHeight;
        },
        // 切换轮播图
        switchTo(i) {
            if(i === this.index || this.switching) {
                return;
            }
            this.switching = true;
            this.index = i;
        },
        handleTransitionEnd() {
            this.switching = false;
        },
        // 鼠标滚轮事件
        handleWheel(e) {
            if(this.switching) {
                return;
            }
            if(e.deltaY > 0 && this.index < this.data.length - 1) {
                // 向下滚
                this.switching = true;
                this.index ++;
            } 
            if(e.deltaY < 0 && this.index > 0) {
                // 向上滚
                this.switching = true;
                this.index --;
            }
        }
    }

}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
    .home-container{
        height: 100%;
        position: relative;
    }
    .carousel-container{
        transition: .6s ease-out;
    }
    .icon{
        @gap: 25px;
        position: absolute;
        font-size: 30px;
        font-weight: bold;
        color: @gray;
        cursor: pointer;
        left: 50%;
        transform: translateX(-50%);
        &-up{
            top: @gap;
            animation: jump-up 1s ease-in-out infinite alternate;
        }
        &-down{
            bottom: @gap;
            animation: jump-down 1s ease-in-out infinite alternate;
        }
    }
    .indicator{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25px;
        li{
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: @words;
            cursor: pointer;
            margin-bottom: 10px;
            border: 1px solid #fff;
            box-sizing: border-box;
            transition: background-color .3s;
            &.active {
                background: #fff;
            }
            &:last-child{
                margin: 0;
            }
        }
    }
    @jump: 5px;
    @keyframes jump-up {
        0%{
            transform: translateY(@jump);
        }
        100%{
            transform: translateY(-@jump);
        }
    }
    @keyframes jump-down {
        0%{
            transform: translateY(-@jump);
        }
        100%{
            transform: translateY(@jump);
        }
    }
</style>