<template lang="pug">
  a(:href="extraData")= data
</template>

<script>
export default {
    name: "DataTableLink",
    props: {
        data: {
            type: String,
            default: "",
        },
        extraData: {
            type: String,
            default: "",
        },
    },
}
</script>

<style lang="scss" scoped></style>
