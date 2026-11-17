

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector(".sw-hero");

    const title = document.getElementById("swHeroTitle");
    const description = document.getElementById("swHeroDescription");
    const image = document.getElementById("swHeroImage");

    const dots = document.querySelectorAll(".sw-slider-dot");

    const prevButton = document.getElementById("swSliderPrev");
    const nextButton = document.getElementById("swSliderNext");

    if (!hero || !title || !description || !image) return;

    const slides = [
    {
        title: `Professional Webinars &
                <span>Training for Workplace Excellence</span>`,

        description: `Expert-led live and on-demand sessions on workplace
        safety, compliance, harassment prevention and more.
        Learn from industry professionals and build a safer,
        more productive workplace.`,

        image: "/static/home/images/hero-woman-laptop.png",
        alt: "Professional woman attending workplace webinar"
    },

    {
        title: `Empowering People 
                <span>Through Workplace Awareness</span>`,

        description: `Build a respectful and inclusive workplace through expert-led training. Help employees develop awareness, strengthen teamwork and create a positive, supportive work environment.`,

        image: "/static/home/images/hero-team-learning.png",
        alt: "Professionals learning together"
    },

    {
        title: `Empower Your Workforce with
                <span>Expert-Led Training</span>`,

        description: `Strengthen your team's knowledge and professional skills with flexible live webinars and on-demand training. Gain practical insights from industry experts and build a more skilled, confident and productive workforce.`,

        image: "/static/home/images/hero-trainer-cutout.png",
        alt: "Professional workplace trainer"
    }
];

    let currentSlide = 0;
    let sliderInterval;

    const slideDuration = 5000;

    function showSlide(index) {

        currentSlide = (index + slides.length) % slides.length;

        const slide = slides[currentSlide];

        title.classList.add("sw-slide-changing");
        description.classList.add("sw-slide-changing");
        image.classList.add("sw-slide-changing");

        setTimeout(function () {

            title.innerHTML = slide.title;
            description.textContent = slide.description;

            image.src = slide.image;
            image.alt = slide.alt;

            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });

            requestAnimationFrame(function () {

                title.classList.remove("sw-slide-changing");
                description.classList.remove("sw-slide-changing");
                image.classList.remove("sw-slide-changing");

            });

        }, 350);

    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {

        clearInterval(sliderInterval);

        sliderInterval = setInterval(function () {

            nextSlide();

        }, slideDuration);

    }

    function stopSlider() {

        clearInterval(sliderInterval);

    }

    // Next button

    nextButton.addEventListener("click", function () {

        nextSlide();
        startSlider();

    });

    // Previous button

    prevButton.addEventListener("click", function () {

        previousSlide();
        startSlider();

    });

    // Navigation dots

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const index = parseInt(
                this.dataset.slide,
                10
            );

            showSlide(index);
            startSlider();

        });

    });

    // Pause on hover

    hero.addEventListener("mouseenter", stopSlider);

    hero.addEventListener("mouseleave", startSlider);

    // Start automatic slider

    startSlider();

});

