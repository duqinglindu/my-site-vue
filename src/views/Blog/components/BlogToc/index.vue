<template>
<!-- 文章目录组件 -->
  <div class="blog-toc-container">
    <h3>目录</h3>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "../RightList";
import {debounce} from "@/utils";  //函数防抖

export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      // activeAnchor: "article-md-title-1", //目前激活的锚点
      activeAnchor: "", 
    }
  },
  computed: {
    // 根据toc属性以及activeAnchor得到带有isSelect数组的toc数组
    /* 
    文章中的标题都是使用的h元素，这些元素都带有一个id，id对应toc的anchor属性 ，即相应的锚点
    */
    tocWithSelect() {
      const getToc = (toc=[])=> {
        return toc.map(t => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getToc(t.children), //没有children就是undefined 给个默认值空数组
        }))
      }
      return getToc(this.toc);
    },
    // 根据toc得到它们对应的h元素数组  [dom1-"对应的id1", dom2-"对应的id2"]
    // 树的深度遍历
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for(const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if(t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      }
      addToDoms(this.toc);
      return doms;
    }
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor; //点击文章标题页面滚动到对应的文章位置 加一个锚点
    },
    //设置 activeAnchor 为正确的值 activeAnchor的值变了激活的样式也会发生改变
    // 滚动条变动，调用函数。 点击右侧目录时会改变hash值 hash变了就会跳转到对应的位置 位置改变就会改变滚动条的位置
    setSelect() {
      /* 
        选中状态实际上是取决于文章中h元素的位置
        h元素都带有一个id
        把一个个h元素拿出来看，哪一个的位置符合激活的位置
      */
      // 需要得到所有的h元素  [dom1-"对应的id1", dom2-"对应的id2"]
      const range = 200; //  0-200px为选中区域
      for(const dom of this.doms) {
        // 根据当前的dom元素的位置判断 是其锚点是否为激活状态
        if(!dom) {
          continue;
        }
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if(top >= 0 && top <= range) {
          // 在规定的范围内
          this.activeAnchor = dom.id;
          return;
        } else if(top > range) {
          // 在规定的范围下方
          return;
        } else {
          // 在规定的范围上方
          this.activeAnchor = dom.id; //先假设自己是激活的，然后看后面的元素，后面元素该激活会进行覆盖改值
        }
      }
    }
  },
  created() {
    // 做个防抖，并将其保存在组件实例中
    this.setSelectDebounce = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setSelectDebounce);  // 监听文章组件滚动事件
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h3 {
    font-size: 1em;
    letter-spacing: 2px;
    font-weight: 600;
    padding-bottom: 10px;
  }
}
</style>
