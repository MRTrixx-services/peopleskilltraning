
document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".lw-recorded-page");
    const filterPanel = document.getElementById("filterPanel");
    const filterBtn = document.getElementById("filterToggleBtn");
    const closeBtn = document.getElementById("filterCloseBtn");

    if (!page || !filterPanel || !filterBtn) return;

    function openFilterDrawer() {
        filterPanel.classList.add("active");
        page.classList.add("filter-open");
        document.body.classList.add("lw-filter-lock");
        filterBtn.setAttribute("aria-expanded", "true");
    }

    function closeFilterDrawer() {
        filterPanel.classList.remove("active");
        page.classList.remove("filter-open");
        document.body.classList.remove("lw-filter-lock");
        filterBtn.setAttribute("aria-expanded", "false");
    }

    filterBtn.addEventListener("click", openFilterDrawer);

    if (closeBtn) {
        closeBtn.addEventListener("click", closeFilterDrawer);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeFilterDrawer();
        }
    });

    page.addEventListener("click", function (event) {
        if (
            page.classList.contains("filter-open") &&
            event.target === page
        ) {
            closeFilterDrawer();
        }
    });

});
