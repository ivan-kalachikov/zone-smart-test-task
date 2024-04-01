<template lang="pug">
    .checkbox
        input(type="checkbox" :id="name" :name="name" v-model="checked" @change="handleChange")
        label(:for="name")
            slot
</template>

<script>
export default {
    name: "DataTableCheckbox",
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Boolean,
            default: null,
        },
    },
    data() {
        return {
            checked: false,
        }
    },
    watch: {
        value(value) {
            console.log(this.id, value)
            this.checked = value
            console.log(this.id, this.checked)
        },
    },
    methods: {
        handleChange() {
            this.$emit("select", { id: this.id, value: this.checked })
        },
    },
}
</script>

<style lang="scss" scoped></style>
