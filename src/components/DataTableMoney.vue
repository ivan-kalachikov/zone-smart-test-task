<template lang="pug">
  span= formattedNumber
</template>

<script>
export default {
    name: "DataTableMoney",
    props: {
        data: {
            type: Number,
            default: null,
        },
    },
    computed: {
        formattedNumber() {
            return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
            }).format(this.data)
        },
    },
}
</script>

<style lang="scss" scoped></style>
