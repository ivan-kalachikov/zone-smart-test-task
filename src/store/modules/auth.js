import { auth, refresh as refreshApi } from "@/api/auth"

export default {
    state: () => ({
        token: localStorage.getItem("token") || "",
        refreshToken: localStorage.getItem("refreshToken") || "",
    }),
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_REFRESH_TOKEN(state, refreshToken) {
            state.refreshToken = refreshToken
            localStorage.setItem("refreshToken", refreshToken)
        },
    },
    actions: {
        async login({ commit }, credentials) {
            const { access, refresh } = await auth(credentials)
            commit("SET_TOKEN", access)
            commit("SET_REFRESH_TOKEN", refresh)
        },
        async refresh({ commit, dispatch }) {
            const refreshToken = localStorage.getItem("refreshToken")
            if (!refreshToken) {
                await dispatch("logout")
                return
            }
            const { access, refresh } = await refreshApi(refreshToken)
            commit("SET_TOKEN", access)
            commit("SET_REFRESH_TOKEN", refresh)
        },
        logout({ commit }) {
            commit("SET_TOKEN", "")
            commit("SET_REFRESH_TOKEN", "")
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
}
