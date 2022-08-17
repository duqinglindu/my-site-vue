import Vue from 'vue'
import VueRouter from 'vue-router'

import "nprogress/nprogress.css";
import {start, done, configure} from 'nprogress'

// import Home from "@/views/Home"
// import Blog from "@/views/Blog"
// import BlogDetail from "@/views/Blog/Detail"
// import About from "@/views/About"
// import Project from "@/views/Project"
// import Message from "@/views/Message"
// import NotFound from "@/views/NotFound.vue"



import {setTitle} from "@/utils"

configure({
    trickleSpeed: 20,
    showSpinner: false,
});

if(!window.VueRouter) {
    Vue.use(VueRouter);
}

function delay(duration) {
    return new Promise(resolve => {
        setTimeout(()=> {
            resolve();
        }, duration);
    })
}

function getPageComponent(pageCompResolver) {
    return async () =>{
        start();
        await delay(1200);
        const comp = await pageCompResolver();
        done();
        return comp;
    }
}

// 路由配置
const router =  new VueRouter({
    routes: [
        {name: "Home", path: "/", component: getPageComponent( () => import("@/views/Home")), meta: {
            // 原数据中配置标题
            title: "首页",
        }},
        {name: "Blog", path: "/blog", component: getPageComponent( () => import("@/views/Blog")), meta: {
            title: "文章",
        }},
        {name: "BlogCategory", path: "/blog/cate/:categoryId",component:getPageComponent ( () => import("@/views/Blog")), meta: {
            title: "文章列表",
        }},
        // "/blog/:id" id为某一篇博客的id
        {name: "BlogDetail", path: "/blog/:id",component:getPageComponent ( () => import("@/views/Blog/Detail")), meta: {
            title: "文章详情",
        }},
        {name: "About", path: "/about",component:getPageComponent ( () => import("@/views/About")), meta: {
            title: "关于我",
        }},
        {name: "Project", path: "/project",component: getPageComponent ( () => import("@/views/Project")), meta: {
            title: "项目&效果",
        }},
        {name: "Message", path: "/message",component: getPageComponent(  () => import("@/views/Message")), meta: {
            title: "留言板",
        }},
        {
            name: "NotFound",
            path: "*",  //在路由中前面的组件都没有被匹配。就匹配该组件
            component: getPageComponent( () => import("@/views/NotFound")),
        }
    ],
    mode: "history",    
    base: process.env.BASE_URL,
})
/**
 * 路由确认之后, 在页面跳转之后进行网页标题的更改  afterEach已经进入了网页就没有next了 
 * 
 * 我们希望达成的效果是 路由标题 + 网站标题
 * 而网站标题是需要通过远程请求数据，然后放在数据仓库中的，因此一开始是得不到网站标题的,
 * 等得到了网站标题后再改变标题
 */
router.afterEach((to, from) => {
    if(to.meta.title) {
        setTitle.setRouteTitle(to.meta.title);
    }
    if(to.name === "NotFound") {
        router.push({
            name: "Home",
        })
    }
})

export default router;