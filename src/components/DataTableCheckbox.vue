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
        isChecked: {
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
        isChecked(value) {
            this.checked = value
        },
    },
    methods: {
        handleChange() {
            this.$emit("select", { id: this.id, value: this.checked })
        },
    },
}
</script>

<style lang="scss" scoped>
.checkbox {
    input {
        display: none;
    }

    label {
        display: block;
        width: 25px;
        height: 25px;
        border: 1px solid var(--secondary-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
    }

    input:checked + label {
        background-color: var(--accent-color);
        border-color: var(--accent-color);

        &::after {
            content: "";
            position: absolute;
            background-color: #fff;
            width: 3px;
            height: 12px;
            transform: rotate(45deg) translate(-50%, -50%);
            transform-origin: center;
            top: 50%;
            left: 40%;
        }

        &::before {
            content: "";
            position: absolute;
            background-color: #fff;
            width: 3px;
            height: 6px;
            transform: rotate(-45deg) translate(-50%, -50%);
            transform-origin: center;
            top: 50%;
            left: 40%;
        }
    }
}
</style>
