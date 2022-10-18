import { createRouter, createWebHashHistory } from "vue-router";
import Index from '~/pages/index.vue'
import NotFound from '~/pages/NotFound.vue'

const routes = [
    {path: "/", component: Index},
    {path: "/:pathMatch(.*?)*", component: NotFound}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router