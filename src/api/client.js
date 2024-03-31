import axios from "axios"

const client = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Accept: "application/json",
    },
})

export default client
