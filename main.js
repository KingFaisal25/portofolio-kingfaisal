// This file contains the JavaScript code for the portfolio website.
// You can add functionality such as event listeners, animations, or dynamic content updates here.

// Typing Animation
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Particle background effect
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 40; i++) {
            const star = document.createElement('div');
            star.className = 'particle-star';
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.7 + 0.3;
            star.style.width = star.style.height = (Math.random() * 3 + 2) + 'px';
            particlesContainer.appendChild(star);
        }
        setInterval(() => {
            document.querySelectorAll('.particle-star').forEach(star => {
                let top = parseFloat(star.style.top);
                top += Math.random() * 0.5 - 0.25;
                if (top > 100) top = 0;
                if (top < 0) top = 100;
                star.style.top = top + '%';
            });
        }, 100);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade in sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Contact button
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Top button
    const topBtn = document.getElementById('top-button');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typing animation for hero text
    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const texts = [
            'Specializing in Cybersecurity, Network Security, IT, Google Certified Professional.',
            'Passionate about protecting digital landscapes.',
            'Expert in threat detection and incident response.',
            'Dedicated to securing tomorrow\'s technology, today.'
        ];
        let currentTextIndex = 0;

        function startTyping() {
            typeWriter(texts[currentTextIndex], typedText, 50);
            setTimeout(() => {
                setTimeout(() => {
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    startTyping();
                }, 1000);
            }, texts[currentTextIndex].length * 50 + 2000);
        }
        startTyping();
    }

    // Skills Radar Chart
    const skillsData = {
        labels: ['Cybersecurity', 'Cloud Security', 'Development', 'Network Security', 'Ethical Hacking', 'Risk Assessment'],
        datasets: [{
            label: 'Skill Level',
            data: [95, 90, 85, 88, 92, 87],
            fill: true,
            backgroundColor: 'rgba(100, 255, 218, 0.2)',
            borderColor: '#64ffda',
            borderWidth: 2,
            pointBackgroundColor: '#64ffda',
            pointBorderColor: '#0a192f',
            pointHoverBackgroundColor: '#0a192f',
            pointHoverBorderColor: '#64ffda'
        }]
    };

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Handle label visibility for form inputs
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');

            if (input && label) {
                // Hide label when input is focused
                input.addEventListener('focus', () => {
                    label.style.opacity = '0';
                    label.style.visibility = 'hidden';
                });

                // Show label when input loses focus and is empty
                input.addEventListener('blur', () => {
                    if (!input.value.trim()) {
                        label.style.opacity = '1';
                        label.style.visibility = 'visible';
                    }
                });

                // Hide label when user starts typing
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        label.style.opacity = '0';
                        label.style.visibility = 'hidden';
                    }
                });
            }
        });

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all fields.');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Send WhatsApp notification
                const whatsappMessage = `📧 *New Contact Form Message*\n\n👤 *Name:* ${data.name}\n📧 *Email:* ${data.email}\n💬 *Message:* ${data.message}\n\n⏰ *Time:* ${new Date().toLocaleString()}`;

                // Using WhatsApp wa.me endpoint
                const whatsappUrl = `https://wa.me/6285798137527?text=${encodeURIComponent(whatsappMessage)}`;

                // For automatic sending, you would typically use a backend service
                // For now, we'll open WhatsApp with pre-filled message
                window.open(whatsappUrl, '_blank');

                // Simulate successful submission
                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Reset labels after form reset
                    formGroups.forEach(group => {
                        const label = group.querySelector('label');
                        if (label) {
                            label.style.opacity = '1';
                            label.style.visibility = 'visible';
                        }
                    });
                }, 1000);

            } catch (error) {
                console.error('Error sending message:', error);
                alert('There was an error sending your message. Please try again.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Testimonials Slider
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Show/hide top button
    window.addEventListener('scroll', () => {
        const topBtn = document.getElementById('top-button');
        if (topBtn) {
            if (window.scrollY > 300) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        }
    });
});

// Add scroll effect for navbar
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    if (window.scrollY > 100) {
        topBar.classList.add('scrolled');
    } else {
        topBar.classList.remove('scrolled');
    }
});

// Hero background parallax effect
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    const scrolled = window.pageYOffset;
    heroBg.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0) scale(1.1)`;
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
