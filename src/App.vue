<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="site-aside">
          <SiteAside />
        </div>
      </template>
  
      <template>
          <router-view></router-view>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
// 回到顶部 只要任何组件中，主区域出现了滚动条 就会出现该组件
import ToTop from "@/components/ToTop";

/* const AsyncCompomtent = () => {  //异步组件
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ToTop); //模拟等一段时候后得到一个组件配置对象
    }, 200)
  })
} */


export default {
  name: "App",
  components: {
    // AsyncCompomtent,
    Layout,
    SiteAside,
    ToTop,
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
    .app-container{
      .self-fill(fixed);
    }
    .site-aside{
      width: 250px;
      height: 100%;
    }
</style>