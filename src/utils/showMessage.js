import getComponentsRootDom from './getComponentsRootDom';  
import Icon from "@/components/Icon"  //导入Icon组件
import styles from "./showMessage.module.less"   //导入对应的css文件
/**
 * 弹出消息  需要使用到图标组件如何得到组件的根元素将组件的根元素放到生成的div中  得到组件渲染的dom结构
 * @param {String} content 消息内容 
 * @param {String} type 消息类型 error info success warn
 * @param {HTMLElement} container 消息容器, 不传则显示到页面正中。显示在容器正中
 * @param {Number} duration 多久消失 0为不消失
 */
export default function({content, type = "info", container, duration = 2000, callBack} = {}) {
    const div = document.createElement("div");
    const rootDom = getComponentsRootDom(Icon, {type,});
    div.innerHTML = `<span class="${styles.icon}">${rootDom.outerHTML}</span><div>${content}</div>`;
    div.className = `${styles.message} ${styles[type]}`;
    if(container) {
        if(getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    } else {
        container = document.body;
    }
    container.appendChild(div);

    div.clientHeight;  //让浏览器强制渲染一次 不然后面的样式会覆盖前面的样式  
    
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%)`;
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = "translate(-50%, -50%) translateY(-25px)";
        div.addEventListener("transitionend", function() {
            this.remove();
            typeof callBack === "function" && callBack();   //执行回调
        }, {once: true})
    }, duration);
}