import Vue from "vue";
// import Vuex from "vuex";

/* 
不导入vuex的所有东西，只是导出仓库   
install可以用于安装插件
*/
import {Store, install} from "vuex";


import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if(!window.Vuex) {
    install(Vue);  //安装插件到vue中
}


// export default new Vuex.Store({
export default new Store({
    modules: {
        banner,
        setting,
        about,
        project,
    },
    strict: true,
})