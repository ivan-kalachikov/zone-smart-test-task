import { auth, refresh as refreshApi } from "@/api/auth"

export default {
    state: () => ({
        token: localStorage.getItem("token") || "",
        refreshToken: localStorage.getItem("refreshToken") || "",
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken
            localStorage.setItem("refreshToken", refreshToken)
        },
    },
    actions: {
        async login({ commit }, credentials) {
            const response = await auth(credentials)
            const { access, refresh } = response.data
            commit("setToken", access)
            commit("setRefreshToken", refresh)
        },
        async refresh({ commit, dispatch }) {
            const refreshToken = localStorage.getItem("refreshToken")
            if (!refreshToken) {
                await dispatch("logout")
                return
            }
            const response = await refreshApi(refreshToken)
            const { access, refresh } = response.data
            commit("setToken", access)
            commit("setRefreshToken", refresh)
        },
        logout({ commit }) {
            commit("setToken", "")
            commit("setRefreshToken", "")
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
}
