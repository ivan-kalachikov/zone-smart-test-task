import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "@/views/LoginPage.vue"

const routes = [
    {
        path: "/",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/products",
        name: "products",
        component: () => import("@/views/ProductsPage.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes,
})

export default router
const routesNames = routes.reduce((acc, route) => {
    return { ...acc, [route.name]: route.name }
}, {})
export { routesNames }
