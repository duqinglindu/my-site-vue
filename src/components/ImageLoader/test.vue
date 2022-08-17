<template>
    <div class="test-container">
        <ImageLoader 
            :src="src" 
            :placeholder="placeholder"
            @load="load" />
    </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
    data() {
        return {
            src : "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg",
            placeholder: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100",
        }
    },
    components: {
        ImageLoader,
    },
    methods: {
        load() {
            console.log("加载完成");
        }
    }
}
</script>

<style>
    .test-container{
        width: 500px;
        margin: 50px auto;
        height: 400px;
    }
</style>