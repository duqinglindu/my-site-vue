<template>
<!-- 显示无数据组件 -->
    <div class="empty-container">
        <Icon type="noData"/>
        <p>
            {{text}}
        </p>
    </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
    props: {
        text: {
            type: String,
            default: "无数据",
        }
    },
    components: {
        Icon,
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
    .empty-container{
        .self-center(); //居中
        color: @gray;
        text-align: center;
        .icon-container{
            font-size: 72px;
        }
    }
</style>