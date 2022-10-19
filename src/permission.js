import router from '~/router'
import { getToken } from "~/composables/auth"
import { toast, showFullLoading, hideFullLoading } from "~/composables/util"
import store from "~/store"

router.beforeEach(async (to, from, next) => {
    // console.log(to,from);
    // 显示loading
    showFullLoading()
    //没有登录强制跳转登录页
    const token = getToken()
    if (!token && to.path != "/login") {
        toast("请先登录", "error")
        return next({ path: "/login" })
    }

    //防止重复登录
    if (token && to.path == "/login") {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : "/" })
    }

    if (token) {
        await store.dispatch("getInfo")
    }
    //设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-笛莎编程商城后台"
    document.title = title
    next()
})

// 全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})