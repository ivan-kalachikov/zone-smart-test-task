<template lang="pug">
    .loading-overlay
        LoadingSpinner
</template>

<script>
import LoadingSpinner from "@/assets/images/spinner.svg"

export default {
    name: "LoadingOverlay",
    components: { LoadingSpinner },
}
</script>

<style lang="scss" scoped>
.loading-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
