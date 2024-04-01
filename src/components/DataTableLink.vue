<template lang="pug">
  a.data-table-link(:href="extraData" target="_blank")
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

<style lang="scss" scoped>
.data-table-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-decoration: none;
    color: var(--primary-color);

    &:hover svg {
        stroke: var(--primary-color);
    }

    svg {
        width: 25px;
        height: 25px;
    }
}
</style>
