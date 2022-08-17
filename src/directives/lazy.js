import eventBus  from "@/eventBus";
import {debounce} from "@/utils";   //导入防抖
import defaultGif from "@/assets/default.gif";

let imgs = []; //存储当前页面具有v-lazy的懒加载img元素的关键信息
// 希望，调用该函数，就可以设置那些合适的图片  需要监听滚动条的滚动
function setImages() {
    for (const img of imgs) {
        setImage(img);
    }
}

// 处理单张图片
function setImage(img) {
    // 该图片是否已经处理过了
    // if(img.handled) {
    //     return;
    // }
    // img.handled = true;
    img.dom.src = defaultGif; //默认图片
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect(); //得到元素相对于视口的位置
    // 图片没加载好前，得不到图片的高度
    const height = rect.height || 150; //给个默认的高度
    if(rect.top >= -rect.height && rect.top <= clientHeight) {
        // 在视口范围内
        const tempImg = new Image();
        tempImg.onload = function() {
            // 当真实图片加载完成后
            img.dom.src = img.src;
        }
        tempImg.src = img.src;
        imgs = imgs.filter(i=> i !== img); // 图片加载后就从数组中移除移除
    } 
}

function handlerScroll() {
    setImages();
}

// 页面滚动时
eventBus.$on("mainScroll", debounce(handlerScroll, 50));


export default {
    inserted(el, bindings) { //元素加到页面中后
        const img = {
            dom: el,
            src: bindings.value,
        }
        imgs.push({ //img元素绑定了该指令就将该元素加入到数组中
            dom: el,
            src: bindings.value,
            // handled: false, //是否已经加载了正确的图片
        })
        setImage(img); //当前图片在视口区域就立即处理
    },
    unbind(el) { //切换页面时  当前页面的图片就不要了
        imgs = imgs.filter(img=> img.dom !== el);
    }
};
