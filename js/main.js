/* ============================================
   MAIN.JS - Portfolio Interactions & Rendering
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Loading Screen ---
    const loadingScreen = document.getElementById('loadingScreen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800);
    });
    // Fallback
    setTimeout(() => loadingScreen.classList.add('hidden'), 3000);

    // --- Cursor Glow ---
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        });
    }

    // --- Populate Content from Data ---
    populateContent();

    // --- Navbar ---
    initNavbar();

    // --- Typewriter ---
    initTypewriter();

    // --- Scroll Animations ---
    initScrollAnimations();

    // --- Counters ---
    initCounters();

    // --- Services ---
    renderServices();

    // --- Skills ---
    renderSkills();

    // --- Projects ---
    renderProjects();

    // --- Gallery ---
    renderGallery();

    // --- Contact Form ---
    initContactForm();

    // --- Footer Year ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

/* ============================================
   Populate Content from siteData
   ============================================ */
function populateContent() {
    const d = siteData.personal;

    // Nav & Footer logos
    setText('navLogoText', d.logoText);
    setText('footerLogoText', d.logoText);
    setText('footerName', d.name);

    // Hero
    setText('heroGreeting', d.greeting);
    const heroGreeting = document.getElementById('heroGreeting');
    if (heroGreeting) heroGreeting.setAttribute('data-text', d.greeting);
    setText('heroName', d.name);
    setText('heroDescription', d.description);

    // Hero image
    const heroImg = document.getElementById('heroImage');
    if (heroImg && d.profileImage) heroImg.src = d.profileImage;

    // Badges
    setText('badgeYears', d.experienceYears);
    setText('badgeProjects', d.projectsCount);

    // Social links
    setHref('socialGithub', d.social.github);
    setHref('socialLinkedin', d.social.linkedin);
    setHref('socialTwitter', d.social.twitter);
    setHref('socialInstagram', d.social.instagram);

    // About
    const aboutImg = document.getElementById('aboutImage');
    if (aboutImg && d.aboutImage) aboutImg.src = d.aboutImage;
    setText('aboutSubtitle', d.aboutSubtitle);
    const aboutTextEl = document.getElementById('aboutText');
    if (aboutTextEl) aboutTextEl.innerHTML = d.aboutText.replace(/\n/g, '<br>');
    setText('aboutName', d.name);
    setText('aboutEmail', d.email);
    setText('aboutLocation', d.location);
    setText('aboutAvailability', d.availability);
    setText('aboutExpYears', d.experienceYears);

    // Stats
    const counters = document.querySelectorAll('.counter');
    const statValues = [d.stats.projects, d.stats.clients, d.stats.experience, d.stats.awards];
    counters.forEach((counter, i) => {
        if (statValues[i] !== undefined) {
            counter.setAttribute('data-target', statValues[i]);
        }
    });

    // Contact
    setText('contactEmail', d.email);
    setText('contactPhone', d.phone);
    setText('contactLocation', d.location);

    // Contact social
    const contactSocials = document.querySelectorAll('.contact-social .social-link');
    const socialUrls = [d.social.github, d.social.linkedin, d.social.twitter, d.social.dribbble];
    contactSocials.forEach((link, i) => {
        if (socialUrls[i]) link.href = socialUrls[i];
    });
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
}

function setHref(id, url) {
    const el = document.getElementById(id);
    if (el && url) el.href = url;
}

/* ============================================
   Navbar
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link based on scroll
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach((section) => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ============================================
   Typewriter Effect
   ============================================ */
function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const titles = siteData.personal.titles;
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            element.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ============================================
   Scroll Reveal Animations
   ============================================ */
function initScrollAnimations() {
    // Add reveal classes to sections
    document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.about-image').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.about-info').forEach(el => el.classList.add('reveal-right'));
    document.querySelectorAll('.services-grid').forEach(el => el.classList.add('stagger-children'));
    document.querySelectorAll('.skills-bars').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.skills-orbit').forEach(el => el.classList.add('reveal-right'));
    document.querySelectorAll('.projects-grid').forEach(el => el.classList.add('stagger-children'));
    document.querySelectorAll('.gallery-grid').forEach(el => el.classList.add('stagger-children'));
    document.querySelectorAll('.contact-info').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.contact-form').forEach(el => el.classList.add('reveal-right'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger skill bar animations
                if (entry.target.classList.contains('reveal-left') &&
                    entry.target.closest('.skills-section')) {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach((el) => {
        observer.observe(el);
    });
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach((counter) => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) observer.observe(statsSection);
}

/* ============================================
   Render Services
   ============================================ */
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = siteData.services.map((service) => `
        <div class="service-card card-shine">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

/* ============================================
   Render Skills
   ============================================ */
function renderSkills() {
    const barsContainer = document.getElementById('skillsBars');
    const orbitContainer = document.getElementById('skillsOrbit');
    if (!barsContainer || !orbitContainer) return;

    // Skill bars (first 6)
    const barSkills = siteData.skills.slice(0, 6);
    barsContainer.innerHTML = barSkills.map((skill) => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name"><i class="${skill.icon}"></i> ${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.percentage}"></div>
            </div>
        </div>
    `).join('');

    // Orbital skills
    const orbitSkills = siteData.skills.slice(0, 8);
    let orbitHTML = `
        <div class="orbit-center">SKILLS</div>
        <div class="orbit-ring orbit-ring-1"></div>
        <div class="orbit-ring orbit-ring-2"></div>
    `;

    orbitSkills.forEach((skill, i) => {
        const angle = (i / orbitSkills.length) * Math.PI * 2 - Math.PI / 2;
        const radius = i < 4 ? 100 : 150;
        const x = 175 + radius * Math.cos(angle) - 22;
        const y = 175 + radius * Math.sin(angle) - 22;

        orbitHTML += `
            <div class="orbit-item" style="left:${x}px; top:${y}px" title="${skill.name}">
                <i class="${skill.icon}"></i>
                <span class="tooltip">${skill.name}</span>
            </div>
        `;
    });

    orbitContainer.innerHTML = orbitHTML;
}

function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach((bar) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

/* ============================================
   Render Projects
   ============================================ */
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const filterContainer = document.getElementById('projectsFilter');
    if (!grid || !filterContainer) return;

    // Build filter buttons
    const categories = ['all', ...new Set(siteData.projects.map((p) => p.category))];
    filterContainer.innerHTML = categories.map((cat) => `
        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');

    // Render all projects
    function renderProjectCards(filter = 'all') {
        const filtered = filter === 'all' ? siteData.projects : siteData.projects.filter((p) => p.category === filter);

        grid.innerHTML = filtered.map((project) => `
            <div class="project-card card-shine" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Project'">
                    <div class="project-overlay">
                        <a href="${project.liveUrl}" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.githubUrl}" target="_blank" title="Source Code"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Re-add stagger animation
        grid.classList.remove('active');
        setTimeout(() => grid.classList.add('active'), 50);
    }

    renderProjectCards();

    // Filter click handlers
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            filterContainer.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderProjectCards(e.target.getAttribute('data-filter'));
        }
    });
}

/* ============================================
   Render Gallery
   ============================================ */
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = siteData.gallery.map((item, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${item.image}" alt="${item.caption}" onerror="this.src='https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo'">
            <div class="gallery-item-overlay">
                <span>${item.caption}</span>
            </div>
        </div>
    `).join('');

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    let currentIndex = 0;

    grid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        currentIndex = parseInt(item.getAttribute('data-index'));
        openLightbox(currentIndex);
    });

    function openLightbox(index) {
        const item = siteData.gallery[index];
        lightboxImage.src = item.image;
        lightboxCaption.textContent = item.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

    document.getElementById('lightboxPrev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + siteData.gallery.length) % siteData.gallery.length;
        openLightbox(currentIndex);
    });

    document.getElementById('lightboxNext').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % siteData.gallery.length;
        openLightbox(currentIndex);
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + siteData.gallery.length) % siteData.gallery.length;
            openLightbox(currentIndex);
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % siteData.gallery.length;
            openLightbox(currentIndex);
        }
    });
}

/* ============================================
   Contact Form
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const subject = document.getElementById('formSubject').value;
        const message = document.getElementById('formMessage').value;

        // Store message in localStorage
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        messages.push({
            id: Date.now(),
            name,
            email,
            subject,
            message,
            date: new Date().toISOString(),
            read: false
        });
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));

        // Show toast
        showToast('Message sent successfully! Thank you.');
        form.reset();
    });
}

/* ============================================
   Toast Notification
   ============================================ */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============================================
   Smooth Scroll for all anchor links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
