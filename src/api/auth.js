import client from "./client"
import { handleError } from "@/utils/errors"

export async function auth({ email, password }) {
    try {
        const response = await client.post("/user/jwt/create/", {
            email,
            password,
        })
        return response?.data || {}
    } catch (error) {
        handleError(error, true)
    }
}

export async function refresh(refreshToken) {
    try {
        const response = await client.post("/user/jwt/refresh/", {
            refresh: refreshToken,
        })
        return response?.data || {}
    } catch (error) {
        handleError(error)
    }
}
