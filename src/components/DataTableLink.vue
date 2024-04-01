<template lang="pug">
  a(:href="extraData" target="_blank")
    Link
    = data
</template>

<script>
import Link from "@/assets/icons/link.svg"

export default {
    name: "DataTableLink",
    components: { Link },
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
