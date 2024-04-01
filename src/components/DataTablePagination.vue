<template lang="pug">
    .pagination
        .wrapper
            button.prev(v-if="!isFirstPage" :disabled="disabled" @click="handlePageChange(currentPage - 1)")
                Arrow
            button(
                v-for="page in pagesToShow"
                :key="page"
                :class="{ active: page === currentPage, gap: page === null }"
                :disabled="disabled"
                @click="handlePageChange(page)"
            )
                Dots(v-if="page === null")
                span(v-else)= page
            button.next(v-if="!isLastPage" :disabled="disabled" @click="handlePageChange(currentPage + 1)")
                Arrow
</template>

<script>
import calculatePagination from "@/utils/pagination"
import Arrow from "@/assets/icons/arrow.svg"
import Dots from "@/assets/icons/dots.svg"

export default {
    name: "DataTablePagination",
    components: { Arrow, Dots },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        offset: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.limit)
        },
        currentPage() {
            return Math.ceil(this.offset / this.limit) + 1
        },
        pagesToShow() {
            return calculatePagination(this.currentPage, this.totalPages)
        },
        isLastPage() {
            return this.currentPage === this.totalPages
        },
        isFirstPage() {
            return this.currentPage === 1
        },
    },
    methods: {
        handlePageChange(page) {
            if (page === null) {
                return
            }
            this.$emit("page-change", page)
        },
    },
}
</script>

<style lang="scss" scoped>
.pagination {
    overflow-x: auto;
}

.wrapper {
    display: inline-flex;
    gap: 4px;
    align-items: center;
}

button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: background-color 0.3s;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    flex-shrink: 0;

    &:hover {
        background-color: var(--background-color);
    }

    &:active {
        background-color: #dad9db;
    }

    &.active {
        background-color: #d0d4d7;
    }

    &.gap {
        padding-top: 10px;
        pointer-events: none;
    }

    &.prev {
        transform: rotate(90deg);
    }

    &.next {
        transform: rotate(-90deg);
    }

    &:disabled {
        cursor: not-allowed;
        background-color: transparent;
    }
}
</style>
