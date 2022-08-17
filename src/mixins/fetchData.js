
/**
 * 公共的远程获取数据的代码
 * 具体的组件中，需要提供一个远程获取数据的方法  fetchData-
 *  -不同组件对应的请求数据方法不一样
 * @param {*} defaultDataValue 数据的基本类型 
 * @returns 公共组件配置对象
 */
export default function(defaultDataValue = null) {
    return {
        data() {
            return {
                isLoading: true, //加载动画是否开启
                data: defaultDataValue,
            }
        },
        async created() {
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }
}