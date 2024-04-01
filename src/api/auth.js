import client from "./client"
import { handleError } from "@/utils/errors"
import getProxifiedUrl from "@/utils/urls"

export async function auth({ email, password }) {
    try {
        const response = await client.post(
            getProxifiedUrl("/user/jwt/create/"),
            {
                email,
                password,
            }
        )
        return response?.data || {}
    } catch (error) {
        handleError(error, true)
    }
}

export async function refresh(refreshToken) {
    try {
        const response = await client.post(
            getProxifiedUrl("/user/jwt/refresh/"),
            {
                refresh: refreshToken,
            }
        )
        return response?.data || {}
    } catch (error) {
        handleError(error)
    }
}
