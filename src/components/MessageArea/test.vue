<template>
    <div class="test-container">
        <MessageArea />
    </div>
</template>

<script>
import "@/styles/global.less"
import MessageArea from "./"

export default {
    components: {
        MessageArea,
    }
}
</script>

<style>
    .test-container{
        padding: 20px;
        width: 700px;
        margin: 100px auto;
        border: 1px solid red;
    }
</style>