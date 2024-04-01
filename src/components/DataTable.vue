<template lang="pug">
    .data-table
        table
            thead
                tr
                    th(v-for="column in columns" :key="column.name")
                        .table-header-wrapper
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
                                :is-checked="selectedIds.size === data.length"
                                id="all"
                                name="all"
                            )
            tbody
                tr
                    td.selection-controls-wrapper(:colspan="columns.length")
                        .selection-controls(v-if="selectedIds.size > 0")
                            .left
                                | {{ `Выбрано ${selectedIds.size} из ${data.length}` }}
                                button.bulk-delete-button(@click="$emit('bulk-delete')")
                                    Delete 
                                    | Удалить выделенные
                            .right
                                span Для всех выделенных
                                DataTableMoneyInput(@submit="({name, value}) => handleBulkSubmit({value, name})" name="min_price" id="min_price")
                                DataTableMoneyInput(@submit="({name, value}) => handleBulkSubmit({value, name})" name="max_price" id="max_price")
                tr(v-for="item in data" :key="item.id")
                    td(v-for="column in columns" :key="column.name")
                        component(
                            v-bind="$attrs"
                            :is="getCellComponent(column.type)"
                            :id="item.id"
                            :name="column.name"
                            :data="item[column.name]"
                            :extra-data="item[column.extraData]"
                            :is-checked="column.type === 'checkbox' && selectedIds.has(item.id)"
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
@import "@/assets/scss/mixins.scss";

.data-table {
    position: relative;
    text-align: left;
}

table {
    border-collapse: collapse;
}

td,
th {
    font-size: 15px;
    line-height: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    max-width: 360px;
}

th {
    color: var(--secondary-color);
    font-weight: normal;
    height: 60px;
}

.table-header-wrapper {
    display: flex;
    align-items: center;
}

.sort {
    display: inline-block;
    cursor: pointer;
    flex-shrink: 0;

    &.desc {
        transform: rotate(180deg);
        transform-origin: center;
    }

    &.active svg {
        stroke: var(--primary-color);
    }
}

.selection-controls {
    height: 60px;
    width: 100%;
    background-color: #dee1e3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.left {
    display: flex;
    gap: 10px;
    align-items: center;
}

.right {
    display: flex;
    gap: 10px;
    align-items: center;
    padding-right: 87px;

    input {
        width: 134px;
    }

    .data-table-money-input:last-child {
        margin-left: 20px;
    }
}

.bulk-delete-button {
    @include secondary-button;

    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    height: 30px;
}

.selection-controls-wrapper {
    padding: 0;
}

.data-table-money-input {
    width: 134px;
}
</style>
