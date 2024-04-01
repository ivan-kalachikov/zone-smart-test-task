<template lang="pug">
    .products
        .container
            .products-header
                h1.products-title Мои товары
                div.tooltip(title="Подсказка, возможно tooltip или ссылка")
                    Question
                span.products-count= `${results.length} из ${count}`
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
                :v-if="isInitialized"
                :columns="columns"
                :data="results"
                :is-pending="isInitialized && isPending"
                :selected-ids="selectedIds"
                @submit="handleSubmit"
                @delete="handleDelete"
                @sort="handleSort"
                @pagination="handlePagination"
                @select="handleSelect"
                @bulk-submit="handleBulkSubmit"
                @bulk-delete="handleBulkDelete"
                @bulk-select="handleBulkSelect"
            )
            .skeleton(v-if="!isInitialized && isPending") Skeleton loading here
</template>

<script>
import Question from "@/assets/icons/question.svg"
import DataTable from "@/components/DataTable.vue"
import productColumns from "@/constants/products"
// import { getProducts } from "@/api/product"

export default {
    name: "ProductsPage",
    components: { Question, DataTable },
    data() {
        return {
            columns: productColumns,
            results: [],
            count: 0,
            isPending: false,
            isInitialized: false,
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
        this.isInitialized = true
    },
    watch: {
        fetchParams() {
            this.fetch(this.fetchParams)
        },
    },
    methods: {
        async fetch() {
            this.isPending = true
            // this.data = await getProducts()
            const { count, results } = await new Promise((resolve) =>
                setTimeout(() => {
                    resolve({
                        count: 15,
                        next: "https://dev-ar.zonesmart.com/product/?limit=10&offset=10",
                        previous: null,
                        results: [
                            {
                                id: "9dc8189f-7c75-4387-998c-991e7c6f033a",
                                created: "2024-01-11T17:00:22.686505+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "https://ozon.ru/context/detail/id/1453168358",
                                title: "iQKitchen Сумка для Подогрева Ланчбокса",
                                sku: "IQ-1",
                                remote_id: "1453168358",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-z/6043576667.jpg",
                                ],
                                price: 1000.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 4534,
                                on_sale: true,
                                min_price: null,
                                max_price: null,
                                brand_id: "5055881",
                                brand_name: "Sunshine",
                                category_id: "17027930",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "9bac9810-21f9-499f-8f7e-48ee661f7ee3",
                                created: "2024-01-11T17:00:22.686473+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "",
                                title: "Накладка заднего бампера для Nissan X-trail 2017-2018 (рестайлингТ32)",
                                sku: "4",
                                remote_id: "0",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-t/6495975413.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-p/6495975409.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-s/6495975412.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-u/6495975414.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-r/6495975411.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-o/6495975408.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-q/6495975410.jpg",
                                ],
                                price: 2040.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 0,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: "126745801",
                                brand_name: "Нет бренда",
                                category_id: "48159484",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "98d25c16-a1bd-47dc-ae85-02d1e5e0269d",
                                created: "2024-01-11T17:00:22.686440+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "",
                                title: "База данных",
                                sku: "db1",
                                remote_id: "0",
                                images: [],
                                price: 100000.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 0,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: null,
                                brand_name: null,
                                category_id: "46590429",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "4b158ed8-ff7c-4a7a-9c9f-a3661e6f323f",
                                created: "2024-01-11T17:00:22.686409+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "https://ozon.ru/context/detail/id/603260355",
                                title: "Monster High Doll: Ghouls Night Out - Spectra Vondergeist - Doll New",
                                sku: "USA4_F000788-A.21.3.5",
                                remote_id: "603260355",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-e/6337680230.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-4/6337680220.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-z/6337680215.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-2/6337680218.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-0/6337680216.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-5/6337680221.jpg",
                                ],
                                price: 15000.0,
                                undiscounted_price: 20000.0,
                                discount: 33.0,
                                quantity: 0,
                                on_sale: true,
                                min_price: null,
                                max_price: null,
                                brand_id: "126745801",
                                brand_name: "",
                                category_id: "0",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "fc386f20-d58b-472b-8c14-b1389e7e9c5c",
                                created: "2024-01-11T17:00:22.686377+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "",
                                title: "Бейсболка Baseball Cap Karate черно-белая (размер OSFM)",
                                sku: "53478",
                                remote_id: "0",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-a/6250097194.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-5/6250097081.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-l/6250097169.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-f/6250097019.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-e/6250097162.jpg",
                                ],
                                price: 1500.0,
                                undiscounted_price: 1700.0,
                                discount: 13.0,
                                quantity: 0,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: "5055881",
                                brand_name: "Sunshine",
                                category_id: "17028631",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "81515aaa-d86c-40d5-b683-034d2cebfb0d",
                                created: "2024-01-11T17:00:22.686345+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "",
                                title: "Бейсболка Baseball Cap Karate черно-белая (размер OSFM)",
                                sku: "53454",
                                remote_id: "0",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-l/6250097169.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-i/6250097058.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-o/6250097172.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-f/6250097019.jpg",
                                    "https://cdn1.ozone.ru/s3/multimedia-e/6250097162.jpg",
                                ],
                                price: 1445.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 0,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: "5055881",
                                brand_name: "Sunshine",
                                category_id: "17028631",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "c9456d48-b4eb-487d-a3a3-51b09ce88022",
                                created: "2024-01-11T17:00:22.686313+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "https://ozon.ru/context/detail/id/489311123",
                                title: "Суппорт локтя Elbow Support черно-красный (размер S/M)",
                                sku: "16414",
                                remote_id: "489311123",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-t/6250159385.jpg",
                                ],
                                price: 990.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 12,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: "126745801",
                                brand_name: "Нет бренда",
                                category_id: "17028711",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "cf123f13-3b70-4ccc-9e89-237a457c0267",
                                created: "2024-01-11T17:00:22.686281+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "",
                                title: "Сэндвичница Brand K220Y9",
                                sku: "xu1-12347",
                                remote_id: "0",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-3/6244396659.jpg",
                                ],
                                price: 119.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 0,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: "970941567",
                                brand_name: "Brand",
                                category_id: "17028969",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "216a4c93-e61a-4a87-b544-d33644e3c832",
                                created: "2024-01-11T17:00:22.686248+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "",
                                title: "Сэндвичница Brand K220Y9",
                                sku: "xu1-12346",
                                remote_id: "0",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-f/6244396671.jpg",
                                ],
                                price: 1176.0,
                                undiscounted_price: 0.0,
                                discount: null,
                                quantity: 0,
                                on_sale: false,
                                min_price: null,
                                max_price: null,
                                brand_id: "970941567",
                                brand_name: "Нет бренда",
                                category_id: "17039629",
                                category_name: null,
                                is_removed: false,
                            },
                            {
                                id: "febc7be1-a9ff-430a-a8b6-70174152f71d",
                                created: "2024-01-11T17:00:22.686216+03:00",
                                account: "006c7191-ea2f-485f-add3-3a30853f57da",
                                strategy: null,
                                url: "https://ozon.ru/context/detail/id/828199930",
                                title: "Кастрюля Zwilling Pro",
                                sku: "PAN-33",
                                remote_id: "828199930",
                                images: [
                                    "https://cdn1.ozone.ru/s3/multimedia-l/6166086705.jpg",
                                ],
                                price: 55500.0,
                                undiscounted_price: 60000.0,
                                discount: 8.0,
                                quantity: 1,
                                on_sale: true,
                                min_price: null,
                                max_price: null,
                                brand_id: "115862816",
                                brand_name: "Zwilling",
                                category_id: "17028732",
                                category_name: null,
                                is_removed: false,
                            },
                        ],
                    })
                }, 1000)
            )
            this.count = count
            this.results = results
            this.isPending = false
        },
        async handleSubmit({ name, value, id }) {
            this.isPending = true
            await new Promise((resolve) =>
                setTimeout(() => {
                    console.log(
                        `PATCH\n id: ${id}\n property: ${name}\n value: ${value}`
                    )
                    resolve()
                }, 1000)
            )
            await this.fetch()
            this.isPending = false
        },
        async handleDelete(id) {
            this.isPending = true
            await new Promise((resolve) =>
                setTimeout(() => {
                    console.log(`DELETE\n id: ${id}`)
                    resolve()
                }, 500)
            )
            await this.fetch()
            this.isPending = false
        },
        handleSort(parameters) {
            console.log(
                `SORT\n name: ${parameters.name}\n direction: ${parameters.direction}`
            )
            this.sort = parameters
        },
        handlePagination({ limit, offset }) {
            console.log(`PAGINATION\n limit: ${limit}\n offset: ${offset}`)
            this.limit = limit
            this.offset = offset
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
            this.isPending = true
            await new Promise((resolve) =>
                setTimeout(() => {
                    console.log(
                        `BULK UPDATE
                         ids: ${[...this.selectedIds].join(", ")}
                         property ${name}
                         value: ${value}`
                    )
                    resolve()
                }, 500)
            )
            await this.fetch()
            this.isPending = false
        },
        async handleBulkDelete() {
            this.isPending = true
            await new Promise((resolve) =>
                setTimeout(() => {
                    console.log(
                        `BULK DELETE\n ids: ${[...this.selectedIds].join(", ")}`
                    )
                    resolve()
                }, 500)
            )
            this.selectedIds.clear()
            await this.fetch()
            this.isPending = false
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.products {
    min-height: 100dvh;
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
</style>
