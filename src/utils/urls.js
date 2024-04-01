export default function getProxifiedUrl(url) {
    const proxyUrl = process.env.VUE_APP_PROXY_URL
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL
    return `${proxyUrl}/?${encodeURIComponent(apiBaseUrl)}${url})`
}
