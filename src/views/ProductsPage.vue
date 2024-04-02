<template lang="pug">
    .products
        .container
            .products-header
                h1.products-title Мои товары
                div.tooltip(title="Подсказка, возможно tooltip или ссылка")
                    Question
                span.products-count= `${results.length} из ${total}`
            p Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
            p Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
            .product-add
                form(@submit.prevent)
                    .form-field
                            label.form-label(for="products") Добавление товаров
                            .form-row
                                input.form-input(
                                    type="text"
                                    placeholder="Введите артикул продавца, артикул WB или ссылку на товар"
                                    id="products"
                                    v-model="productsToAdd"
                                    name="products"
                                    disabled
                                )
                                button.form-button(type="submit" disabled) Добавить
                            .products-hint
                                | Например ваши товары:
                                span 119203059,
                                span 124366343,
                                span 59801844
            DataTable(
                :columns="columns"
                :data="results"
                :is-pending="isPending"
                :selected-ids="selectedIds"
                @submit="handleSubmit"
                @delete="handleDelete"
                @sort="handleSort"
                @select="handleSelect"
                @bulk-submit="handleBulkSubmit"
                @bulk-delete="handleBulkDelete"
                @bulk-select="handleBulkSelect"
            )
            DataTablePagination(
                v-if="results.length > 0"
                :offset="offset"
                :limit="limit"
                :total="total"
                @page-change="handlePageChange"
                :disabled="isPending"
            )
</template>

<script>
import Question from "@/assets/icons/question.svg"
import DataTable from "@/components/DataTable.vue"
import DataTablePagination from "@/components/DataTablePagination.vue"
import productColumns from "@/constants/products"
import { getProducts } from "@/api/product"
import { handleError } from "@/utils/errors"

export default {
    name: "ProductsPage",
    components: { Question, DataTable, DataTablePagination },
    data() {
        return {
            columns: productColumns,
            results: [],
            total: 0,
            isPending: false,
            productsToAdd: "",
            sort: {},
            offset: 0,
            limit: 10,
            selectedIds: new Set(),
        }
    },
    computed: {
        fetchParams() {
            return {
                limit: this.limit,
                offset: this.offset,
                ...this.sort,
            }
        },
    },
    async created() {
        await this.fetch()
    },
    watch: {
        fetchParams() {
            this.fetch(this.fetchParams)
        },
    },
    methods: {
        async fetch() {
            this.callAsyncFunc(async () => {
                const { results, count } = await getProducts(this.fetchParams)
                this.results = results
                this.total = count
            }, true)
        },
        async callAsyncFunc(fn, notRefetchAfter = false) {
            this.isPending = true
            try {
                await fn()
                if (!notRefetchAfter) {
                    await this.fetch()
                }
            } catch (error) {
                handleError(error)
            }
            this.isPending = false
        },
        async delay(cb) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            await cb()
        },
        async handleSubmit({ name, value, id }) {
            this.callAsyncFunc(async () => {
                await this.delay(
                    console.log(
                        `PATCH\n id: ${id}\n property: ${name}\n value: ${value}`
                    )
                )
            })
        },
        async handleDelete(id) {
            this.callAsyncFunc(async () => {
                await this.delay(console.log(console.log(`DELETE\n id: ${id}`)))
            })
        },
        handleSort(parameters) {
            console.log(
                `SORT\n name: ${parameters.name}\n direction: ${parameters.direction}`
            )
            this.sort = parameters
        },
        handleSelect({ id, value }) {
            if (value) {
                this.selectedIds.add(id)
            } else {
                this.selectedIds.delete(id)
            }
        },
        handleBulkSelect(value) {
            if (value) {
                this.selectedIds = new Set(this.results.map(({ id }) => id))
            } else {
                this.selectedIds.clear()
            }
        },
        async handleBulkSubmit({ value, name }) {
            this.callAsyncFunc(async () => {
                await this.delay(
                    console.log(
                        `BULK UPDATE ids: ${[...this.selectedIds].join(
                            ", "
                        )} property ${name}value: ${value}`
                    )
                )
            })
        },
        async handleBulkDelete() {
            this.callAsyncFunc(async () => {
                await this.delay(
                    console.log(
                        `BULK DELETE\n ids: ${[...this.selectedIds].join(", ")}`
                    )
                )
                this.selectedIds.clear()
            })
        },
        handlePageChange(page) {
            this.selectedIds.clear()
            this.offset = (page - 1) * this.limit
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.products {
    min-height: 100dvh;
    padding: 40px 0;
    background-color: var(--background-color);
}

.container {
    width: 1520px;
    max-width: calc(100% - 30px);
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    padding: 20px 15px 40px;
    border-radius: 15px;
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.16);

    @media (min-width: 768px) {
        padding: 40px 40px 60px;
    }
}

.products-header {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-bottom: 30px;
}

.products-title {
    font-weight: 600;
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 0;
}

.products-count {
    margin-left: 10px;
    font-size: 15px;
    color: var(--secondary-color);
}

p {
    font-size: 15px;
    line-height: 25px;
}

.form-label {
    @include form-label;
}

.form-input {
    @include form-input;
    max-width: 746px;
}

.form-button {
    @include button;

    width: auto;
}

.form-row {
    display: flex;
    flex-flow: column;
    gap: 20px;

    @media (min-width: 768px) {
        flex-flow: row;
    }
}

.products-hint {
    font-size: 12px;
    color: var(--secondary-color);
    margin-top: 4px;
    line-height: 16px;

    span {
        text-decoration: underline dashed;
    }
}

.product-add {
    margin-top: 30px;
    margin-bottom: 30px;
}

.pagination {
    margin-top: 30px;
    text-align: right;
}
</style>
