import axios from "axios"
import store from "@/store"

const client = axios.create({
    headers: {
        Accept: "application/json",
    },
})

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("error in interceptor", error)
        if (error.response?.status === 401) {
            await store.dispatch("refresh")
            return axios.request(error.config)
        }
        return Promise.reject(error)
    }
)

export default client
