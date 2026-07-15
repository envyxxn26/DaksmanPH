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

    // Smooth FAQ open/close animation (single item open) — replaces native toggle behavior
    faqItems.forEach((item) => {
        const summary = item.querySelector('summary');
        // Wrap content after summary into .faq-content if not already wrapped
        let content = item.querySelector('.faq-content');
        if (!content) {
            content = document.createElement('div');
            content.className = 'faq-content';
            while (summary.nextSibling) {
                content.appendChild(summary.nextSibling);
            }
            item.appendChild(content);
        }

        // Initialize styles
        content.style.overflow = 'hidden';
        content.style.transition = 'height 260ms ease';
        if (item.open) {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0px';
        }

        function closeDetail(d) {
            const c = d.querySelector('.faq-content');
            if (!c) return;
            c.style.height = c.scrollHeight + 'px';
            requestAnimationFrame(() => { c.style.height = '0px'; });
            d.open = false;
        }

        function openDetail() {
            faqItems.forEach((other) => {
                if (other !== item && other.open) closeDetail(other);
            });
            item.open = true;
            const h = content.scrollHeight;
            content.style.height = h + 'px';
            function onEnd() {
                content.style.height = 'auto';
                content.removeEventListener('transitionend', onEnd);
            }
            content.addEventListener('transitionend', onEnd);
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.open) {
                closeDetail(item);
            } else {
                openDetail();
            }
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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const payload = new URLSearchParams();
            formData.forEach((value, key) => payload.append(key, value));

            try {
                const response = await fetch(contactForm.action || '/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: payload.toString(),
                });

                const result = await response.json();
                if (response.ok && result.success) {
                    alert('Thank you for reaching out. Your message has been sent.');
                    contactForm.reset();
                } else {
                    alert(result.error || 'Unable to send your message. Please try again later.');
                }
            } catch (error) {
                alert('Unable to send your message. Please try again later.');
                console.error(error);
            }
        });
    }
});
