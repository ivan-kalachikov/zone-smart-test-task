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
                        if column.type === 'checkbox'
                            DataTableCheckbox(
                                @select="({value}) => $emit('bulk-select', value)"
                                :value="selectedIds.size === data.length"
                                id="all"
                                name="all"
                            )
            tbody
                tr.selection-controls(v-if="selectedIds.size > 0")
                    td(colspan=3) 
                    | {{ `Выбрано ${selectedIds.size} из ${data.length}` }}
                    button.bulk-delete-button(@click="$emit('bulk-delete')")
                        Delete 
                        | Удалить выделенные
                    
                    td(colspan=2)
                    td Для всех выделенных
                    td(colspan=2)
                        DataTableMoneyInput(@submit="({value}) => handleBulkSubmit({value, name: 'min_price'})")
                    td
                        DataTableMoneyInput(@submit="({value}) => handleBulkSubmit({value, name: 'max_price'})")
                    td

                tr(v-for="item in data" :key="item.id")
                    td(v-for="column in columns" :key="column.name")
                        component(
                            v-bind="$attrs"
                            :is="getCellComponent(column.type)"
                            :id="item.id"
                            :name="column.name"
                            :data="item[column.name]"
                            :extra-data="item[column.extraData]"
                            :value="column.type === 'checkbox' ? selectedIds.has(item.id) : null"
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
import Delete from "@/assets/icons/delete-bold-small.svg"
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
        Delete,
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
        handleBulkSubmit({ value, name }) {
            this.$emit("bulk-submit", { value, name })
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
