export default function generatePagination(currentPage, totalPages) {
    // Constants for pagination
    const maxPagesToShow = 9,
        visiblePages = 5
    let pages = []

    // Simple case: show all pages if under max limit
    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else {
        // Complex case: need to calculate which pages to show
        pages = [1] // Start with the first page

        // Determine the middle section's start and end
        let start = Math.max(currentPage - 2, 2)
        let end = Math.min(currentPage + 2, totalPages - 1)

        // Adjust if near the start
        if (currentPage < visiblePages) {
            end = maxPagesToShow - 2
        }

        // Adjust if near the end
        if (currentPage > totalPages - visiblePages + 1) {
            start = totalPages - (maxPagesToShow - 3)
        }

        // Handle adding the first gap
        if (start > 2) {
            pages.push(null) // Gap after the first page
        }

        // Add visible pages or middle pages
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        // Handle adding the second gap
        if (end < totalPages - 1) {
            pages.push(null) // Gap before the last page
        }

        // Always end with the last page
        pages.push(totalPages)
    }

    return pages
}
