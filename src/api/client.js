import axios from "axios"
import store from "@/store"

const proxyEnabled = process.env.VUE_APP_PROXY_ENABLED || false
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL
const proxyUrl = process.env.VUE_APP_PROXY_URL
import router from "@/router"
import { routesNames } from "@/router"

const client = axios.create({
    baseURL: proxyEnabled ? proxyUrl : apiBaseUrl,
    headers: {
        Accept: "application/json",
    },
})

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response?.status === 401 &&
            router.currentRoute?.value?.name !== routesNames.login
        ) {
            await store.dispatch("refresh")
            error.config = {
                ...error.config,
                headers: {
                    ...error.config.headers,
                    Authorization: `JWT ${store.state.auth.token}`,
                },
            }
            return axios.request(error.config)
        }
        return Promise.reject(error)
    }
)

client.interceptors.request.use((request) => {
    if (proxyEnabled) {
        const url =
            apiBaseUrl +
            request.url +
            "/?" +
            new URLSearchParams(request.params).toString()
        request.url = `/?${encodeURIComponent(url)}`
        request.params = {}
    }
    return request
})

export default client
