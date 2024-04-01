<template lang="pug">
    .data-table
        table
            thead
                tr
                    th(v-for="column in columns" :key="column.name")
                        | {{ column.title }}
                        if column.sortable
                            div(
                            :class="['sort', sort[column.name] || 'asc', { active: activeSortColumnName === column.name }]" 
                            @click="sortClickHandle(column.name)"
                            )
                                Arrow
            tbody
                tr.selection-controls(v-if="selectedIds.size > 0")
                    td(colspan=3)= `Выбрано ${selectedIds.size} из ${data.length}`
                    td(colspan=2)
                    td Для всех выделенных

                tr(v-for="item in data" :key="item.id")
                    td(v-for="column in columns" :key="column.name")
                        component(
                            v-bind="$attrs"
                            :is="getCellComponent(column.type)"
                            :id="item.id"
                            :name="column.name"
                            :data="item[column.name]"
                            :extra-data="item[column.extraData]"
                        )= item[column.name]
        LoadingOverlay(v-if="isPending")    
</template>

<script>
import Arrow from "@/assets/icons/arrow.svg"
import DataTableCheckbox from "@/components/DataTableCheckbox.vue"
import DataTableDelete from "@/components/DataTableDelete.vue"
import DataTableImage from "@/components/DataTableImage.vue"
import DataTableLink from "@/components/DataTableLink.vue"
import DataTableMoney from "@/components/DataTableMoney.vue"
import DataTableMoneyInput from "@/components/DataTableMoneyInput.vue"
import DataTableNumber from "@/components/DataTableNumber.vue"
import LoadingOverlay from "@/components/LoadingOverlay.vue"

const typeToComponent = {
    checkbox: "DataTableCheckbox",
    delete: "DataTableDelete",
    image: "DataTableImage",
    link: "DataTableLink",
    money: "DataTableMoney",
    moneyInput: "DataTableMoneyInput",
    number: "DataTableNumber",
    text: "span",
}

export default {
    name: "DataTable",
    components: {
        Arrow,
        DataTableCheckbox,
        DataTableDelete,
        DataTableImage,
        DataTableLink,
        DataTableMoney,
        DataTableMoneyInput,
        DataTableNumber,
        LoadingOverlay,
    },
    props: {
        columns: {
            type: Array,
            default: () => [],
            required: true,
        },
        data: {
            type: Array,
            default: () => [],
            required: true,
        },
        isPending: {
            type: Boolean,
            default: false,
        },
        selectedIds: {
            type: Set,
            default: () => new Set(),
        },
    },
    data() {
        return {
            sort: {},
            activeSortColumnName: "",
        }
    },
    methods: {
        getCellComponent(type) {
            return typeToComponent[type] || "span"
        },
        sortClickHandle(columnName) {
            this.activeSortColumnName = columnName
            this.sort[columnName] =
                this.sort[columnName] === "asc" || !this.sort[columnName]
                    ? "desc"
                    : "asc"
            this.$emit("sort", {
                name: columnName,
                direction: this.sort[columnName],
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.data-table {
    position: relative;
}

.sort {
    display: inline-block;
    cursor: pointer;

    &.desc {
        transform: rotate(180deg);
        transform-origin: center;
    }

    &.active svg {
        stroke: var(--primary-color);
    }
}
</style>
