<template>
<!-- 单张图片 -->
    <div class="carouselItem-container"
        :style="{
            height,
        }"
        ref="container"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
    >
        <div class="carousel-img"
            ref="imgContainer"
            :style="imgPosition"
        >
            <ImageLoader
                :src="carousel.bigImg"
                :placeholder="carousel.midImg"
                @load="showWords"
            />
        </div>
        <h2 class="title" ref="title">{{ carousel.title }}</h2>
        <p class="desc" ref="desc">{{ carousel.description }}</p>
    </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";

function show(ele, width, time) {
    ele.style.opacity = 1;
    ele.style.width = 0;
    ele.clientWidth; // reflow
    ele.style.transition = time + " ease-out";
    ele.style.width = width + "px";
}

export default {
    props: ["carousel", "height"],
    components: {
        ImageLoader,
    },
    data() {
        return {
            titleWidth: 0,
            descWidth: 0,
            containerSize: null, //外层容器的尺寸
            imgSize: null, //里层图片的尺寸
            mouseX: 0, // 鼠标的横坐标
            mouseY: 0, // 鼠标的纵坐标
        }
    },
    computed: {
        // 图片位置  根据鼠标的坐标得到图片的left top值
        imgPosition() {
            if(!this.containerSize || !this.imgSize) {
                return;
            }
            // 图片多出容器的尺寸
            const extraWidth = this.imgSize.width - this.containerSize.width;
            const extraHeight = this.imgSize.height - this.containerSize.height;
            /* 
            图片的X / 多出的尺寸  =  鼠标x / 外层容器的宽度
            */ 
            const left = -(this.mouseX / this.containerSize.width * extraWidth);
            const top = -(this.mouseY / this.containerSize.height * extraHeight);
            return {
                transform: `translate(${left}px, ${top}px)`,
            }
        },
        // 中间位置
        center() {
            return {
                x: this.containerSize.width / 2,
                y: this.containerSize.height / 2,
            }
        },
    },
    mounted() {
        this.titleWidth = this.$refs.title.clientWidth;
        this.descWidth = this.$refs.desc.clientWidth;
        this.setSize(); 
        this.handleMouseLeave();  //图片初始位置 居中
        window.addEventListener("resize", this.setSize);
    },
    destroyed() {
        window.removeEventListener("resize", this.setSize);
    },
    methods: {
        showWords() {
            show(this.$refs.title, this.titleWidth, "1s");
            show(this.$refs.desc, this.descWidth, "2s 1s");
        },
        //得到各个容器的尺寸
        setSize() {
            this.containerSize = {
                width: this.$refs.container.clientWidth,
                height: this.$refs.container.clientHeight,
            },
            this.imgSize = {
                width: this.$refs.imgContainer.clientWidth,
                height: this.$refs.imgContainer.clientHeight,
            }
        },
        handleMouseMove(e) {
            const rect = this.$refs.container.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        },
        // 图片居中
        handleMouseLeave() {
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
        }
    }

}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
    .carouselItem-container{
        position: relative;
        overflow: hidden;
    }
    .carousel-img{
        width: 110%;
        height: 110%;
        position: absolute;
        top: 0;
        left: 0;
        transition: .3s ease;
    }
    .title,
    .desc{
        position: absolute;
        letter-spacing: 3px;
        left: 30px;
        color: #fff;
        white-space: nowrap;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5),
                    -1px 0 0 rgba(0, 0, 0, 0.5),
                    0 1px 0 rgba(0, 0, 0, 0.5),
                    0 -1px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;
        opacity: 0;
    }
    .title {
        top: calc(50% - 40px);
        font-size: 2em;
    }
    .desc {
        top: calc(50% + 20px);
        font-size: 1.2em;
        color: lighten(@gray, 20%);
    }
</style>