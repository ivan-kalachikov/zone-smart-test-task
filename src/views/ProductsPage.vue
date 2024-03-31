<template lang="pug">
    .products
        .container
            .products-header
                h1.products-title Мои товары
                div.tooltip(title="Подсказка, возможно tooltip или ссылка")
                    Question
                span.products-count= `${countShowed} из ${countTotal}`
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
                                    v-model="products"
                                    name="products"
                                    disabled
                                )
                                button.form-button(type="submit" disabled) Добавить
                            .products-hint
                                | Например ваши товары:
                                span 119203059,
                                span 124366343,
                                span 59801844
                    
            DataTable(@fetched="onFetched")
</template>

<script>
import Question from "@/assets/icons/question.svg"
import DataTable from "@/components/DataTable.vue"

export default {
    name: "ProductsPage",
    components: { Question, DataTable },
    data() {
        return {
            products: "",
            countShowed: 0,
            countTotal: 0,
        }
    },
    methods: {
        onFetched({ countShowed, countTotal }) {
            this.countShowed = countShowed
            this.countTotal = countTotal
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
