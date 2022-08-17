<template>
    <div class="test-container">
        <Empty :text="text" />
    </div>
</template>

<script>
import Empty from "./";
export default {
    name: "Test",
    data() {
        return {
            text: "没有一点东西",
        }
    },
    components: {
        Empty,
    }
}
</script>

<style>
    .test-container{
        position: relative;
        height: 200px;
    }
</style>