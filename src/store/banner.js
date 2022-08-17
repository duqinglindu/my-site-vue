import {getBannersData} from "@/api/banner";

/**
 * 网站首页使用的数据
 */
export default {
    namespaced: true,
    state: {
        loading : false,
        data: [],
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async fetchBanner(ctx) {
            if(ctx.state.data.length) {
                return; //当前仓库有值，就不需要拿了
            }
            ctx.commit("setLoading", true);
            const resp = await getBannersData(); //拿取服务器的响应结果
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
        }
    }
}