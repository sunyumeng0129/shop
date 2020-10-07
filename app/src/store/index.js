import Vue from 'vue'
import Vuex from 'vuex'
import { Notify, Dialog } from 'vant';
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
        arr: [],
        allCheck: false,
        newarr: [],
        tjarr: [],
        nogivearr: []
    },
    mutations: {
        getdata(state, payload) {
            state.data = payload
        },
        arrAdd(state, pid) {
            const index = state.arr.findIndex(item => item.pid === pid)
            if (index === -1) {
                state.data.forEach(item => {
                    if (item.pid === pid) {
                        state.arr.push({...item, check: false })
                    }
                })
            } else {
                state.arr.forEach(item => {
                    if (item.pid === pid) {
                        item.num++
                    }
                })
            }
            Notify({ type: 'danger', message: '添加成功', duration: 1000 });
        },

        delitem(state, index) {
            Dialog.confirm({
                    title: "",
                    message: "您确定要删除吗？",
                })
                .then(() => {
                    state.arr.splice(index, 1)
                })
                .catch(() => {});
        },
        //全选
        ALL_CHECK(state) {
            state.allCheck = !state.allCheck;
            state.arr.map(item => item.check = state.allCheck);
            state.arr.map(item => {
                console.log(item.check);
            })

        },

        START_ALL(state) {
            state.allCheck = false;
        },
        //反选
        ONE_CHECK(state, pid) {
            state.arr.map(item => {
                if (item.pid === pid) {
                    item.check = !item.check
                } else {
                    return
                }
            })
            state.allCheck = state.arr.every(item => item.check)
        },
        //提交订单
        TJ_DD(state) {
            state.arr.forEach(item => {
                if (item.check) {
                    state.newarr.push(item)
                }
            })
        },

        NOGIVE_DD(state) {
            state.newarr.forEach(item => {
                state.nogivearr.push(item)
                state.newarr = []
            })
        },
        GIVE_DD(state) {
            state.newarr.forEach(item => {
                state.tjarr.push(item)
                state.newarr = []
            })
        },

        DEL_GIVE(state, index) {
            Dialog.confirm({
                    title: "",
                    message: "您确定要退款吗？",
                })
                .then(() => {
                    state.tjarr.splice(index, 1)
                    Notify({ type: 'danger', message: '申请退款成功', duration: 1000 });
                })
                .catch(() => {});
        },
        DEL_TJ(state, index) {
            Dialog.confirm({
                    title: "",
                    message: "您确定要取消付款此商品吗？",
                })
                .then(() => {
                    state.newarr.splice(index, 1)
                    Notify({ type: 'danger', message: '申请取消付款此商品成功', duration: 1000 });
                })
                .catch(() => {});
        },
        DEL_NOGIVE(state, index) {
            Dialog.confirm({
                    title: "",
                    message: "您确定要取消付款吗？",
                })
                .then(() => {
                    state.nogivearr.splice(index, 1)
                    Notify({ type: 'danger', message: '取消付款成功', duration: 1000 });
                })
                .catch(() => {});
        },
    },
    getters: {
        //总价
        ALL_PRICE(state) {
            return state.arr.filter(item => item.check).reduce((prev, next) => {
                return prev + next.num * next.sale_price * 100
            }, 0)
        },

    },
    actions: {
        async getdatas(context) {
            let result = await axios.get('/product/list')
            context.commit("getdata", result.result)
        }
    },
    modules: {}
})