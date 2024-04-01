<template lang="pug">
    .data-table-image
        img(:src="data[0]" alt="")
</template>

<script>
export default {
    name: "DataTableImage",
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss" scoped>
.data-table-image {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
