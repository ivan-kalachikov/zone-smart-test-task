import client from "./client"
import { handleError } from "./utils/error"

export async function auth(email, password) {
    try {
        const response = await client.post("/user/jwt/create/", {
            email,
            password,
        })
        return response?.data || {}
    } catch (error) {
        handleError(error)
    }
}

export async function refresh(refreshToken) {
    try {
        const response = await client.post("/user/jwt/refresh/", {
            refresh: refreshToken,
        })
        const { access, refresh } = response.data
        return { access, refresh }
    } catch (error) {
        handleError(error)
    }
}
