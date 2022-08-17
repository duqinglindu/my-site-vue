/**
 * 自定义指令 v-loading
 */
import loadingUrl from "@/assets/loading.svg"
import styles from "./loading.module.less"
function  createLoadingImg() {
    const img = document.createElement("img");
    img.dataset.role = "loading";  //加一个特殊的属性
    img.src = loadingUrl;
    img.className = styles.loading;
    return img;
}
function getLoadingImg(el) {
    return el.querySelector('img[data-role="loading"]');
}
export default function(el, binding) {
    var curImg = getLoadingImg(el);
    if(binding.value) {
        // 创建
        if(!curImg) {
            el.appendChild( createLoadingImg() );
        }
    } else {
        // 删除
        if(curImg) {
            curImg.remove();
        }
    }
}