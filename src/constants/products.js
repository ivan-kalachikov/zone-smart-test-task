export default [
    {
        name: "selection",
        type: "checkbox",
        sortable: false,
        title: "",
    },
    {
        name: "images",
        type: "image",
        sortable: false,
        title: "Фото",
    },
    {
        name: "sku",
        type: "link",
        sortable: false,
        title: "Артикул продавца",
        extraData: "url",
    },
    {
        name: "brand_name",
        type: "text",
        sortable: true,
        title: "Бренд",
    },
    {
        name: "title",
        type: "text",
        sortable: false,
        title: "Название",
    },
    {
        name: "quantity",
        type: "number",
        sortable: true,
        title: "Остаток, шт.",
    },
    {
        name: "price",
        type: "money",
        sortable: true,
        title: "Текущая цена",
    },
    {
        name: "min_price",
        type: "moneyInput",
        sortable: true,
        title: "Минимальная цена",
    },
    {
        name: "max_price",
        type: "moneyInput",
        sortable: true,
        title: "Максимальная цена",
    },
    {
        name: "delete",
        type: "delete",
        sortable: false,
        title: "Удалить",
    },
]
