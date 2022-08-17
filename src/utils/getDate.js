/**
 * 传入一个时间戳 返回一个友好的字符串格式的日期
 * @param {String} time 时间戳 
 * @param {Boolean} showTime 是否显示时分秒
 */
export default function(time, showTime=false) {
    const date = new Date(+time);
    const year = (date.getFullYear() + "").padStart(2, "0");
    const month = (date.getMonth() + 1 + "").padStart(2, "0");
    const day = (date.getDate() + "").padStart(2, "0");
    let str = `${year}-${month}-${day}`;
    if(showTime) {
        const h = (date.getHours() + "").padStart(2, "0");
        const m = (date.getMinutes() + "").padStart(2, "0");
        const s = (date.getSeconds() + "").padStart(2, "0");
        str += ` ${h}:${m}:${s}`;
    }
    return str;
}