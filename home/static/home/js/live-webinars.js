
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MOBILE FILTER DRAWER
    // =====================================

    const page = document.querySelector(".lw-page");
    const filterBtn = document.getElementById("lwMobileFilterToggle");
    const filterClose = document.getElementById("lwFilterClose");

    function openFilterDrawer() {
        if (!page) return;

        page.classList.add("lw-filter-open");
        document.body.classList.add("lw-filter-lock");

        if (filterBtn) {
            filterBtn.setAttribute("aria-expanded", "true");
        }
    }

    function closeFilterDrawer() {
        if (!page) return;

        page.classList.remove("lw-filter-open");
        document.body.classList.remove("lw-filter-lock");

        if (filterBtn) {
            filterBtn.setAttribute("aria-expanded", "false");
        }
    }

    if (filterBtn) {
        filterBtn.addEventListener("click", openFilterDrawer);
    }

    if (filterClose) {
        filterClose.addEventListener("click", closeFilterDrawer);
    }

    // Close drawer on Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeFilterDrawer();
        }
    });

    // Close drawer when clicking backdrop
    if (page) {
        page.addEventListener("click", function (event) {
            if (
                page.classList.contains("lw-filter-open") &&
                event.target === page
            ) {
                closeFilterDrawer();
            }
        });
    }


    // =====================================
    // WEBINAR COUNTDOWN
    // =====================================

    const countdownElements = document.querySelectorAll(".countdown");

    countdownElements.forEach(function (el) {

        const startTime = new Date(el.dataset.start);

        function updateCountdown() {

            const now = new Date();
            const diff = startTime - now;

            if (diff <= 0) {
                el.innerHTML = `<span class="countdown-live-badge">
                <span class="live-dot"></span>
                                LIVE NOW
                            </span>
                        `;

                const timeLeftDiv = el.closest(".time-left");

                if (timeLeftDiv) {
                    timeLeftDiv.classList.add("live-now");
                }

                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60)
            );

            if (days > 1) {
                el.innerHTML = `Starts in ${days} days`;
            } else if (days === 1) {
                el.innerHTML = "Starts in 1 day";
            } else if (hours > 0) {
                el.innerHTML = `Starts in ${hours}h ${minutes}m`;
            } else {
                el.innerHTML = `Starts in ${minutes}m`;
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 60000);
    });

});
