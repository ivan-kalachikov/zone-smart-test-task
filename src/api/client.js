import axios from "axios"

const client = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
})

export default client
