<template lang="pug">
    .checkbox
        input(type="checkbox" :id="name" :name="name" v-model="checked" @change="handleChange")
        label(:for="name")
            slot
</template>

<script>
export default {
    name: "DataTableImage",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            checked: false,
        }
    },
    methods: {
        handleChange() {
            this.$emit("select", { id: this.id, value: this.checked })
        },
    },
}
</script>

<style lang="scss" scoped></style>
