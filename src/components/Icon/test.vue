<template>
    <ul class="test-container">
        <li v-for="(t, i) in typesArr" :key="i" >
            <Icon :type="t" />
            <p>{{t}}</p>
        </li>
    </ul>
</template>

<script>
import Icon, {typesArr} from "./";
export default {
    data() {
        return {
            typesArr, //类型数组
        }   
    },
    components: {
        Icon
    }
}
</script>

<style scoped lang="less">
    .test-container{
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-content: center;

        li{
            margin-right: 15px;
            text-align: center;

            .icon-container{
                font-size: 20px;
                font-weight: bold;
            }
            
            p{
                margin: 0;
            }
        }
    }
</style>