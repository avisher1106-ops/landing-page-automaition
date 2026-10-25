const billingToggle = document.getElementById('billingToggle');
const monthlyPrices = document.querySelectorAll('.amount.monthly');
const yearlyPrices = document.querySelectorAll('.amount.yearly');

billingToggle.addEventListener('change', () => {
    const isYearly = billingToggle.checked;
    monthlyPrices.forEach(el => el.style.display = isYearly ? 'none' : 'inline');
    yearlyPrices.forEach(el => el.style.display = isYearly ? 'inline' : 'none');
});

const demoBtn = document.getElementById('demoBtn');
const demoModal = document.getElementById('demoModal');
const closeModal = document.getElementById('closeModal');

demoBtn.addEventListener('click', () => {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
});

demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const ctaForm = document.getElementById('ctaForm');
const demoForm = document.getElementById('demoForm');

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 3000;
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = ctaForm.querySelector('input').value;
    if (email) {
        showToast('נרשמת בהצלחה! בדוק את המייל שלך.');
        ctaForm.reset();
    }
});

demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = demoForm.querySelectorAll('input, select');
    let valid = true;
    inputs.forEach(input => {
        if (!input.value) valid = false;
    });
    if (valid) {
        showToast('בקשת ההדגמה נשלחה! ניצור קשר בקרוב.');
        demoForm.reset();
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        showToast('אנא מלא את כל השדות', 'error');
    }
});

const navCta = document.getElementById('navCta');
const heroCta = document.getElementById('heroCta');

[navCta, heroCta].forEach(btn => {
    btn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            ctaForm.querySelector('input').focus();
        }, 500);
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const statValues = document.querySelectorAll('.stat-value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.textContent.replace(/[^\d]/g, ''));
            const suffix = el.textContent.replace(/[\d]/g, '');
            animateNumber(el, 0, target, 1500, suffix);
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(el => statsObserver.observe(el));

function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        element.textContent = current.toLocaleString() + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});