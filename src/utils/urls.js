const proxyEnabled = process.env.VUE_APP_PROXY_ENABLED || false
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL
const proxyUrl = process.env.VUE_APP_PROXY_URL

export default function createUrl(url, useProxy = false) {
    if (useProxy && proxyEnabled) {
        return `${proxyUrl}/?${encodeURIComponent(apiBaseUrl + url)}`
    }
    return `${apiBaseUrl}${url}`
}
