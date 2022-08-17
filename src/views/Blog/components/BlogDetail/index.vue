<template>
<!-- 文章主体组件  单篇文章-->
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期: {{ getDate(blog.createDate) }}</span>
      <span>浏览: {{ blog.scanNumber }}</span>
      <a href="#message-container">评论: {{ blog.commentNumber }}</a>
      <a href="">{{ blog.category.name }}</a>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { getDate } from "@/utils";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";

export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside{
  margin-top: .5em;
  padding-left: 10px;
  font-size: 12px;
  color: @gray;
  span, a{
    white-space: nowrap;
    margin-right: 15px;
  }
}
.markdown-body{
  padding: 1.5em 0;
  border-bottom: 1px dotted;
}
</style>
