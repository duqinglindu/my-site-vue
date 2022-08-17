/**
 * 拆分url字符串
 * @param {String} url  url字符串 
 * @returns url参数组成的对象
 */
function disposeUrl(url) {
    const parameterStr = url.slice(url.indexOf("?") + 1);
    const parameterArr = parameterStr.split("&");
    return parameterArr.reduce((prev, icur) => {
        const parArr = icur.split("=");
        prev[parArr[0]] = parArr[1];
        return prev;
    }, {})
}
export default disposeUrl;