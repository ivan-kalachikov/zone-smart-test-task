export function handleError(error) {
    if (process.env.NODE_ENV === "development") {
        console.error(error)
    }
}
