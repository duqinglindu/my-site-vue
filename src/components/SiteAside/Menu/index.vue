<template>
    <!-- 导航栏组件 -->
    <nav class="menu-container">
        <router-link v-for="item in itmesData" :key="item.name"
            :to="{name : item.name}"
            :exact="item.exact"
            active-class="selected"
            >
            <div class="icon">
                <Icon :type="item.icon" />
            </div>
            <span>{{item.title}}</span>
        </router-link>
    </nav>
</template>

<script>
import Icon from "@/components/Icon";
const itmesData = [
    {
        name: "Home",
        title: "首页",
        icon: "home",
        exact: true, //精确匹配
    },
    {
        name: "Blog", //连接的地址
        title: "文章", //标题
        icon: "blog", // 图标类型
        // startWith: true, // 只要当前路径以link开头，当前菜单就是选中的
        /* 
            文章下面会有文章分类，分页等 所以路径可能会是 /blog/music : 音乐类
            所以认为只要路径是以此开头的就可以了 
        */
       exact: false, //模糊匹配
    },
    {
        name: "About",
        title: "关于我",
        icon: "about",
        exact: true,
    },
    {
        name: "Project",
        title: "项目&效果",
        icon: "code",
        exact: true,
    },
    {
        name: "Message",
        title: "留言板",
        icon: "chat",
        exact: true,
    },
]
export default {
    data() {
        return {
            itmesData,
        }
    },
    components: {
        Icon,
    },
    /*  methods: {
        isSelected(item) {
            const link = item.link.toLowerCase(); //链接的地址
            const curPathname = location.pathname.toLowerCase(); // 当前浏览器的访问路径
            if(item.startWith) { //模糊匹配 只要是以该路径开头的就算是选中状态
            // 如"/blog/fasdfadsgadg"
                return curPathname.startsWith(link);
            }
            return link === curPathname;  //精准匹配
        }
    } */
}
</script>

<style scoped lang="less">
    @import "~@/styles/var.less";
    .menu-container{
        color: @gray;
        margin: 24px 0;
        a{
            &.selected{ //选中到当前项的样式
                background: darken(@words, 3%); //less的颜色减淡函数
            }
            display: flex;
            height: 45px;
            padding-left: 50px;
            align-items: center;
            .icon{
                width: 24px;
            }
            &:hover{
                columns: #fff;
            }
        }
    }
</style>