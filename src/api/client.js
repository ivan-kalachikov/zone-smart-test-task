import axios from "axios"

const client = axios.create({
    headers: {
        Accept: "application/json",
    },
})

export default client
