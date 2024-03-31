export function handleError(error, passThrough = false) {
    if (process.env.NODE_ENV === "development") {
        console.error(error)
    }
    if (passThrough) {
        throw error
    }
}
