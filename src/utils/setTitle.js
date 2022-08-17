/* 
控制网站标题
分别设置网站的标题， 路由设置路由部分，仓库设置网站标题
*/
var routeTitle = "",
    siteTitle = "";

function setTitle() {
    if (!routeTitle && !siteTitle) {
        document.title = "loading...";
    } else if (routeTitle && !siteTitle) {
        document.title = routeTitle;
    } else if (!routeTitle && siteTitle) {
        document.title = siteTitle;
    } else {
        document.title = `${routeTitle}-${siteTitle}`;
    }
}
export default {
    // 设置路由标题
    setRouteTitle(title) {
        routeTitle = title;
        setTitle();
    },
    // 设置网站标题
    setSiteTitle(title) {
        siteTitle = title;
        setTitle();
    },
};