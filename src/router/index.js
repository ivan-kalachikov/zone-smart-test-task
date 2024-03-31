import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const routes = {
    home: {
        path: "/",
        name: "home",
        component: HomeView,
    },
    about: {
        path: "/about",
        name: "about",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: Object.values(routes),
})

export default router
export { routes }
