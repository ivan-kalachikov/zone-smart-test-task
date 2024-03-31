<template lang="pug">
    .login
        .login-form-wrapper
            h1.form-title Вход
            form.login-form(@submit.prevent="onSubmit")
                .form-field
                    label.form-label(for="email") Email
                    input.form-input(
                        type="email"
                        required
                        placeholder="yourmail@mail.ru"
                        id="email"
                        v-model="email"
                        name="email"
                        :disabled="isPending"
                    )
                    if emailErrors
                        .form-field-error= emailErrors
                .form-field
                    label.form-label(for="password") Email
                    .form-input-wrapper
                        input.form-input(
                            :type="passwordType"
                            required
                            placeholder="Ваш пароль"
                            id="password"
                            v-model="password"
                            name="password"
                            :disabled="isPending"
                        )
                        .toggle-password(@click="togglePassword")
                            Eye
                    if passwordErrors
                        .form-field-error= passwordErrors
                button.form-button(type="submit" :disabled="disabledSubmit") Войти
            .form-error= formError
            LoadingOverlay(v-if="isPending")
</template>

<script>
import Eye from "@/assets/icons/eye.svg"
import { mapActions } from "vuex"
import { routesNames } from "@/router"
import LoadingOverlay from "@/components/LoadingOverlay.vue"

export default {
    name: "LoginPage",
    components: { Eye, LoadingOverlay },
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,
            errors: {},
            isPending: false,
        }
    },
    computed: {
        disabledSubmit() {
            return this.isPending || !this.email || !this.password
        },
        emailErrors() {
            return this.errors.email?.join("\n")
        },
        formError() {
            return this.errors?.detail
        },
        passwordErrors() {
            return this.errors.password?.join("\n")
        },
        passwordType() {
            return this.showPassword ? "text" : "password"
        },
    },
    methods: {
        ...mapActions(["login"]),
        async onSubmit() {
            this.errors = {}
            this.isPending = true
            try {
                await this.login({ email: this.email, password: this.password })
                this.$router.push({ name: routesNames.products })
            } catch (error) {
                const errors =
                    error.response?.data?.errors || error.response?.data || {}
                if (errors) {
                    this.errors = errors
                }
            }
            this.isPending = false
        },
        togglePassword() {
            this.showPassword = !this.showPassword
        },
    },
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--background-color);
}

.login-form-wrapper {
    max-width: calc(100vw - 30px);
    width: 500px;
    padding: 40px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.16);
    position: relative;
}

.form-title {
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 32px;
    color: var(--primary-color);

    @media (min-width: 768px) {
        font-size: 42px;
    }
}

.form-field {
    margin-bottom: 20px;
}

.form-input-wrapper {
    position: relative;

    .form-input {
        padding-right: 60px;
    }
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    color: var(--secondary-color);
}

.toggle-password {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 25px;
    height: 25px;

    svg {
        width: 100%;
    }

    &:hover svg {
        stroke: var(--primary-color);
    }
}

.form-input {
    border: none;
    height: 50px;
    background-color: var(--background-color);
    width: 100%;
    padding: 0 20px;
    border-radius: 6px;
    box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, 0.25);

    &:invalid {
        border: 1px solid var(--warn-color);
    }
}

.form-field-error,
.form-error {
    margin-top: 8px;
    color: var(--warn-color);
    font-size: 12px;
}

.form-button {
    user-select: none;
    width: 100%;
    padding: 10px 30px;
    border: none;
    border-radius: 6px;
    background-color: var(--accent-color);
    color: white;
    cursor: pointer;
    font-weight: 600;
    height: 50px;
    transition: color 0.1s, background-color 0.1s;

    &:hover {
        background-color: #2cc7b1;
    }

    &:active {
        background-color: #29bda7;
    }

    &:disabled {
        background-color: var(--background-color);
        cursor: not-allowed;
        color: #cececf;
    }
}
</style>
