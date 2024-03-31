import axios from "axios"

console.log(
    "process.env.VUE_APP_API_BASE_URL",
    process.env.VUE_APP_API_BASE_URL
)

const client = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
})

export default client
