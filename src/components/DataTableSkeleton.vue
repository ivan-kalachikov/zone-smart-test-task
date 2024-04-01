<template lang="pug">
    .data-table-skeleton
        .skeleton-item-row(v-for="index in rows" :key="index")
            .skeleton-item-cell(v-for="index in cols" :key="index")
</template>

<script>
export default {
    name: "DataTableSkeleton",
    props: {
        cols: {
            type: Number,
            default: 10,
        },
        rows: {
            type: Number,
            default: 5,
        },
    },
}
</script>

<style lang="scss" scoped>
.data-table-skeleton {
    width: 100%;
}

.skeleton-item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    height: 60px;
}

.skeleton-item-cell {
    flex-shrink: 0;
    flex-grow: 0;
    width: 100px;
    height: 25px;
    border-radius: 4px;
    background-color: #eee;
    background-image: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;

    $widths: 25px, 40px, 140px, 95px, 85px, 140px, 170px, 200px, 220px, 80px;

    @each $width in $widths {
        $index: index($widths, $width);
        &:nth-child(#{$index}) {
            width: $width;
        }
    }
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
