import client from "./client"
import { handleError } from "./utils/error"

export async function get() {
    try {
        const response = await client.get("/product", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return response?.data || []
    } catch (error) {
        handleError(error)
    }
}
