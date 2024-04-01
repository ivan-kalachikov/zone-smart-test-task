<template lang="pug">
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

<style lang="scss" scoped></style>
