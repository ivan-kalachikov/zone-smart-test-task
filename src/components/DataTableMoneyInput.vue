<template lang="pug">
    span
        input(v-model="formattedNumber" @input="handleInput" @keyup.enter="handleEnter" :name="name" placeholder="₽")
</template>

<script>
export default {
    name: "DataTableMoneyInput",
    props: {
        id: {
            type: String,
            required: true,
        },
        data: {
            type: Number,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            formattedNumber: this.formatNumber(this.data || 0),
        }
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
            }).format(number)
        },
        handleInput(event) {
            if (event.inputType === "deleteContentBackward") return
            const numericValue = parseFloat(
                this.formattedNumber.replace(/[^\d.-]/g, "")
            )
            this.formattedNumber = this.formatNumber(numericValue || 0)
        },
        handleEnter() {
            const numericValue = parseFloat(
                this.formattedNumber.replace(/[^\d.-]/g, "")
            )
            this.$emit("submit", {
                name: this.name,
                value: numericValue,
                id: this.id,
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
