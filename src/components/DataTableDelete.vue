<template lang="pug">
    .data-table-delete(@click="$emit('delete', id)" tabindex="0" role="button")
        Delete
</template>

<script>
import Delete from "@/assets/icons/delete.svg"

export default {
    name: "DataTableDelete",
    components: { Delete },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
.data-table-delete {
    cursor: pointer;
}
</style>
