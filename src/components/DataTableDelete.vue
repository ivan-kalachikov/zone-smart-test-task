<template lang="pug">
    .delete-icon(@click="$emit('delete', id)")
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

<style lang="scss" scoped></style>
