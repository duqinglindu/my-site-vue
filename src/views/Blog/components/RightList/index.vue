<template>
    <ul class="rightList-container" v-if="list.length">
        <li v-for="(item, i) in list" :key="i">
            <div @click="handleClick(item)"
            :class="{
                active: item.isSelect,
            }"
            >
                <span>{{item.name}}</span>
                <span class="aside">{{item.aside}}</span>
            </div>
            <!-- undefined 默认为没传属性 item.children没有就是undefined的 -->
            <RightList :list="item.children" @select="handleClick" />
            <!-- 触发事件时 继续向上抛事件 类似与事件冒泡 -->
        </li>
    </ul>
</template>

<script>
export default {
    name: "RightList",
    props: {
        list: {
            type: Array,
            default: () => [], //没传属性的默认值
        }
    },
    methods: {
        handleClick(item) {
            this.$emit("select", item)
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

    .rightList-container{
        margin-left: 1em;
        li{
            min-height: 40px;
            line-height: 40px;
            cursor: pointer;
            div:hover{
                span{
                    color: @warn;
                }
            }
            .active {
                span{
                    color: @warn;
                    font-weight: bold;
                }
            }
        }
        .aside {
            vertical-align: middle;
            font-size: 12px;
            margin-left: 1em;
            color: @gray;
        }
    }
</style>