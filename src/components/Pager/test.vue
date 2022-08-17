<template>
    <div>
        <p>分页组件</p>
        <Pager :current="current" :total="total" 
        @pageChange="handlePageChange($event)"/>
        <!-- 自定义事件中$event得到的是我们在子组件中传入的事件参数 -->
    </div>
</template>

<script>
import Pager from "./"; //默认去找index.vue
export default {
    data() {
        return {
        current: 2,
        total: 302,
        }
    },
    components: { 
        Pager,
    },
    methods: {
        handlePageChange(newpage) {
        this.current = newpage;
        // 加载当前页的数据
        }
    }
}
</script>

<style scoped>
    
</style>