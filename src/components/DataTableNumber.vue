<template lang="pug">
  span= formattedNumber
</template>

<script>
export default {
    name: "DataTableNumber",
    props: {
        data: {
            type: Number,
            default: null,
        },
    },
    computed: {
        formattedNumber() {
            return new Intl.NumberFormat("ru-RU").format(this.data)
        },
    },
}
</script>
