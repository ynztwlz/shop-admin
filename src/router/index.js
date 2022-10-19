import { createRouter, createWebHashHistory } from "vue-router";
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/NotFound.vue'

const routes = [
    { path: "/", component: Index, meta: { title: "后台首页" } },
    { path: "/login", component: Login, meta: { title: "登录页" } },
    { path: "/:pathMatch(.*)*", component: NotFound }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router