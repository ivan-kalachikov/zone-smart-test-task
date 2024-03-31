<template lang="pug">
    .products
        .products-header
            h1.products-title Мои товары
            div(title="Подсказка, возможно tooltip или ссылка")
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
                
</template>

<script>
import Question from "@/assets/icons/question.svg"

export default {
    name: "ProductsPage",
    components: { Question },
    data() {
        return {
            products: "",
            countShowed: 0,
            countTotal: 0,
        }
    },
}
</script>
