<template>
<!-- 分页组件 -->
    <div class="pager-container" v-if="pageNumber > 1">
        <!-- 总页数>1才显示 -->
        <a :class="{disabled: current === 1,}" @click="handleClick(1)">|&lt;&lt;</a>
        <!-- 上一页 -->
        <a :class="{disabled: current === 1,}" @click="handleClick(current - 1)">&lt;&lt;</a>
        
        <a 
            v-for="(n, i) in numbersArr"
            :key="i"
            :class="{active: current === n}"
            @click="handleClick(n)"
        >{{n}}</a>

        <a :class="{disabled: current === pageNumber}" @click="handleClick(current + 1)">&gt;&gt;</a>
        <a :class="{disabled: current === pageNumber}" @click="handleClick(pageNumber)">&gt;&gt;|</a>
    </div>
</template>


<script>
export default {
    props: {
        current: { //当前页
            type: Number,
            default: 1,
        },
        total: { //总数据量
            type: Number,
            default: 0,
        },
        limit: { //一页显示多少条数据
            type: Number,
            default: 10,
        },
        visibleNumber: { //最多显示的页码数
            type: Number,
            default: 10,
        }
    },
    computed: {
        pageNumber() { //总页数
            return Math.ceil(this.total / this.limit);
        },
        visibleMin() {
            let min = this.current - Math.floor( this.visibleNumber / 2 );
            if(min < 1) {
                min = 1;
            }
            return min;
        },
        visibleMax() {
            let max = this.visibleMin + this.visibleNumber - 1;
            if(max > this.pageNumber) {
                max = this.pageNumber;
            }
            return max;
        },
        numbersArr() {
            var pageArr = [];
            for(let i = this.visibleMin; i <= this.visibleMax; i ++ ) {
                pageArr.push(i);
            }
            return pageArr;
        }
    },
    methods: {
        handleClick(newPage) {
            if(newPage < 1) {
                newPage = 1;
            }
            if(newPage > this.pageNumber) {
                newPage = this.pageNumber;
            }
            if(newPage === this.current) {
                return;
            }
            this.$emit("pageChange", newPage);
        }
    }
}
</script>


<style lang="less" scoped>
    @import "~@/styles/var.less";
    .pager-container{
        display: flex;
        justify-content: center;
        margin: 20px 0;
        a{
            color: @primary;
            margin: 0 6px;
            cursor: pointer;
            // 不能点击的样式
            &.disabled{
                color: @lightWords;
                cursor: not-allowed;
            }
            // 当前页的样式
            &.active{
                color: @dark;
                font-weight: bold;
            }
        }
    }
</style>
