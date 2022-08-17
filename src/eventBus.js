// 事件总线
/* 
    在该是对象内部提供一个存储事件处理对象
    {     事件名   对应的处理函数
        "event1" : ["fun1", "fun2"],
    }
*/
const listeners = {};
export const eventBus =  {
    /**
     * 当什么时候做什么事情 监听某一个事件
     * @param {*} eventName 事件的名字 
     * @param {*} handler 对应的处理函数
     */
    $on(eventName, handler) {
        if(!listeners[eventName]) {
            listeners[eventName] = new Set(); //去重,防止多次添加同一个事件处理函数
        }
        listeners[eventName].add(handler);
    },
    /**
     * 取消监听某一件事
     * @param {*} eventName 事件的名称 
     * @param {*} handler 对应的处理函数
     */
    $off(eventName, handler) {
        if(!listeners[eventName]) {
            return;
        }
        listeners[eventName].delete(handler);
    },
    /**
     * 触发事件
     * @param {*} eventName 事件的名称
     * @param  {...any} args 携带的数据
     */
    $emit(eventName, ...args) {
        if(!listeners[eventName]) {
            return;
        }
        for(const handler of listeners[eventName]) {
            handler(...args);
        }
    },
}
/* 
使用
    注册 eventBus.$on("event1", func)
    触发 eventBus.$emit("event1", 12);
*/


// 在vue中
import Vue from "vue"
const app = new Vue({});
/* 
在vue实例和组件中不仅有触发事件的 $emit()方法 还有监听事件的方法 $on  以及取消事件的方法$off
因此我们导出一个vue实例 就可以得到一个事件总线

事件名: mainScroll 主区域滚动条
含义: 主区域滚动条位置变化后触发
事件参数: 
    -滚动的dom元素，如果是undefined，则表示dom元素不存在

事件名：setMainScroll
含义: 当需要设置主区域滚动条位置时触发
事件参数： 滚动高度
*/
Vue.prototype.$bus = app; //注入到vue原型中，方便在组件中直接使用
export default app;   //为了js模块也能使用事件总线所以将其导出