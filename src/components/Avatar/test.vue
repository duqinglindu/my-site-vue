<template>
    <div>
        <Avatar :url="url" />
    </div>
</template>

<script>
import Avatar from "./";
export default {
    data() {
        return {
            url: "https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics0.baidu.com%2Ffeed%2Ff3d3572c11dfa9ecb92c26e45ec4820a908fc1e4.jpeg%3Ftoken%3D0419d707082c2d0e9de0dbadbade5d42&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=w931&n=0&g=0n&q=75&fmt=auto?sec=1637600400&t=aced8d05b29884f65df0d08c861a6971",
        }
    },
    components: {
        Avatar,
    }
}
</script>

<style>

</style>