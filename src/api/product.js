import client from "./client"
import { handleError } from "@/utils/errors"

export async function getProducts(options = {}) {
    const { offset = 0, limit = 10 } = options
    try {
        const response = await client.get("/product", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
            },
            params: {
                offset,
                limit,
            },
        })
        return response?.data || []
    } catch (error) {
        handleError(error)
    }
}
