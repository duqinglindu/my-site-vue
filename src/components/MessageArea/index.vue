<template>
    <div class="messageArea-container">
        <h3>{{totalTitle}}</h3>
        <!-- 该组件不能处理submit事件，因此需要继续把事件往上抛 使用messageArea组件的组件才能处理 -->
        <!-- 
            子组件的事件原封不动的一层层的向上抛
            通过v-on 可以一次传递多个事件处理函数
            v-on:事件名=""  用于注册单个事件，v-on还有一种用法可以注册多个事件处理函数
            v-on="{   //传一个事件处理函数列表对象
                    "click": func,
                    "mouse": func,
                    "submit": func
            }"
            v-on="{submit: handleSubmit}" === v-on:submit="handleSubmit"
            事件处理函数列表对象 类似与$listeners 父组件传递给我的事件处理函数列表对象 这里我们直接传回去
            v-on="$listeners"
        -->
        <DataForm v-on="$listeners" />
        <h3>
            {{listTitle}}
            <span>({{subListTitle}})</span>
        </h3>
        <DataList :list="list" />
        <div class="loading" v-loading="isListLoading"></div>
    </div>
</template>

<script>
import DataForm from "./DataForm"
import DataList from "./DataList"
export default {
    components: {
        DataForm,
        DataList,
    },
    props: {
        totalTitle: {
            type: String,
            default: "",
        },
        listTitle: {
            type: String,
            default: "",
        },
        subListTitle: {
            type: Number,
            default: "",
        },
        // 列表数据
        list: {
            type: Array,
            default: ()=> [],
        },
        isListLoading: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<style scoped>
    .loading{
        height: 80px;
        position: relative;
    }
    h3{
        font-weight: 600;
    }
</style>