<template>
    <ul class="dataList-container">
        <li v-for="item in list" :key="item.id">
            <Avatar 
            :url="item.avatar" 
            :size="44" />
            <div class="data">
                <span class="nickname">{{item.nickname}}</span>
                <p class="content">
                    {{item.content}}
                </p>
                <span class="time">{{getDate(item.createDate, true)}}</span>
            </div>
        </li>
    </ul>
</template>

<script>
import Avatar from "@/components/Avatar"
import {getDate} from "@/utils"
export default {
    components: {
        Avatar,
    },
    props: {
        list: {
            type: Array,
            default: () => {},
        }
    },
    methods: {
        getDate,
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
    .dataList-container{
        padding-left: 1em;
    }
    li{
        display: flex;
        align-items: flex-start;
        border-bottom: 1px solid lighten(@gray, 20%);
        padding-bottom: 15px;
        padding-top: 10px;
    }
    .avatar-container{
        margin-right: 15px;
    }
    .data{
        flex: 1 1 auto;
        position: relative;
    }
    .nickname {
        color: darken(@success, 10%);
    }
    .content {
        padding-top: 5px;
        font-size: 14px;
    }
    .time{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
        color: @gray;
    }
</style>