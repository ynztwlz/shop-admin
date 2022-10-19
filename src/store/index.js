import { createStore } from "vuex";
import { getInfo } from '~/api/manager'
import { removeToken } from '~/composables/auth'

const store = createStore({
    state(){
        return {
            user: {}
        }
    },
    mutations: {
        SET_USERINFO(state, user){
            state.user = user
        }
    },
    actions: {
        getInfo({commit}){
            return new Promise((resolve, reject)=>{
                getInfo().then(res=>{
                    commit("SET_USERINFO", res)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        logout({commit}){
            removeToken()
            commit("SET_USERINFO", {})
        }
    }
})

export default store