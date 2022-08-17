import Vue from "vue"
/**
 * 获取某个组件渲染的dom根元素
 * @param {Object} comp 组件对象
 * @param {Object} props 组件的属性 {type: home,}
 * @returns 
 */
function getComponentRootDom(comp, props) {
    const vm = new Vue({
        render: h => h(comp, {props})
    })
    vm.$mount();
    return vm.$el;
}
export default getComponentRootDom;