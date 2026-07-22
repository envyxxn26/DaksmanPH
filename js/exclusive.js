const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => {
    observer.observe(section);
});

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    hero.style.opacity = 1 - scroll / 600;

});

const cards = document.querySelectorAll(".card, .step, .action");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        }

    });

});

const pageSections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    pageSections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    document.querySelectorAll("nav a").forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

const numbers = document.querySelectorAll(".step span");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const element = entry.target;

            const finalNumber = parseInt(element.innerText);

            let current = 0;

            const interval = setInterval(() => {

                current++;

                element.innerText = current.toString().padStart(2,"0");

                if(current >= finalNumber){

                    clearInterval(interval);

                    element.innerText = finalNumber.toString().padStart(2,"0");

                }

            },40);

            counterObserver.unobserve(element);

        }

    });

},{
    threshold:0.8
});

numbers.forEach(number => {

    counterObserver.observe(number);

});

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

// Carousel functionality for men's health section
const carousel = document.querySelector(".magazine-carousel");
const indicatorsContainer = document.getElementById("indicators");
const carouselCards = document.querySelectorAll(".magazine-carousel .magazine-card");

let currentIndex = 0;
let autoScrollTimeout;
let autoScrollInterval;
let isUserInteracting = false;

// Create indicators
carouselCards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        goToSlide(index);
        isUserInteracting = true;
        stopAutoScroll();
    });
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-indicators .dot");

function updateCarousel() {
    if (carousel) {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselCards.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);
}

function startAutoScrollTimer() {
    stopAutoScroll();
    isUserInteracting = false;
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, 120000);
}

// Start the auto-scroll timer on page load
startAutoScrollTimer();

// Reset timer if user clicks on indicators
indicatorsContainer.addEventListener("click", () => {
    startAutoScrollTimer();
});