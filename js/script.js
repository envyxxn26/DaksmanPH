document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const backToTop = document.querySelector('.back-to-top');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.querySelector('.contact-form');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    faqItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            faqItems.forEach((other) => {
                if (other !== item) other.open = false;
            });
        });
    });

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const orderModal = document.querySelector('.order-modal');
    const orderTriggers = document.querySelectorAll('.order-now-trigger');
    const orderClose = document.querySelector('.order-modal__close');
    const orderBackdrop = document.querySelector('[data-close-modal]');

    function openOrderModal() {
        if (!orderModal) return;
        orderModal.classList.add('is-open');
        orderModal.setAttribute('aria-hidden', 'false');
    }

    function closeOrderModal() {
        if (!orderModal) return;
        orderModal.classList.remove('is-open');
        orderModal.setAttribute('aria-hidden', 'true');
    }

    orderTriggers.forEach((trigger) => {
        trigger.addEventListener('click', openOrderModal);
    });

    if (orderClose) {
        orderClose.addEventListener('click', closeOrderModal);
    }

    if (orderBackdrop) {
        orderBackdrop.addEventListener('click', closeOrderModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeOrderModal();
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out. We will get back to you soon.');
            contactForm.reset();
        });
    }
});
