/* ============================================
   ADMIN DASHBOARD - CRUD Operations
   ============================================ */

let adminInitialized = false;

function initAdminDashboard() {
    if (adminInitialized) return;
    adminInitialized = true;

    // --- Panel Navigation ---
    initPanelNav();

    // --- Load Personal Data ---
    loadPersonalData();

    // --- Render Lists ---
    renderServicesList();
    renderSkillsList();
    renderProjectsList();
    renderGalleryList();
    renderMessagesList();

    // --- Save Handlers ---
    initSaveHandlers();

    // --- Add Handlers ---
    initAddHandlers();

    // --- Modal ---
    initModal();

    // --- Reset ---
    initReset();

    // --- Mobile Toggle ---
    initMobileToggle();
}

// Only initialize dashboard if already authenticated (valid session)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof isAuthenticated !== 'undefined' && isAuthenticated) {
        initAdminDashboard();
    }
});

/* ============================================
   Panel Navigation
   ============================================ */
const panelTitles = {
    personal: 'Personal Information',
    services: 'Services',
    skills: 'Skills',
    projects: 'Projects',
    gallery: 'Photo Gallery',
    messages: 'Messages'
};

function initPanelNav() {
    const links = document.querySelectorAll('.sidebar-link[data-panel]');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const panel = link.getAttribute('data-panel');

            // Update active states
            links.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');

            document.querySelectorAll('.admin-panel').forEach((p) => p.classList.remove('active'));
            const targetPanel = document.getElementById(`panel-${panel}`);
            if (targetPanel) targetPanel.classList.add('active');

            document.getElementById('panelTitle').textContent = panelTitles[panel] || panel;

            // Close mobile sidebar
            document.getElementById('adminSidebar').classList.remove('active');
        });
    });
}

/* ============================================
   Personal Data
   ============================================ */
function loadPersonalData() {
    const d = siteData.personal;
    setVal('admin-name', d.name);
    setVal('admin-logoText', d.logoText);
    setVal('admin-greeting', d.greeting);
    setVal('admin-email', d.email);
    setVal('admin-phone', d.phone);
    setVal('admin-location', d.location);
    setVal('admin-availability', d.availability);
    setVal('admin-experienceYears', d.experienceYears);
    setVal('admin-projectsCount', d.projectsCount);
    setVal('admin-description', d.description);
    setVal('admin-aboutSubtitle', d.aboutSubtitle);
    setVal('admin-aboutText', d.aboutText);
    setVal('admin-titles', d.titles.join('\n'));
    setVal('admin-profileImage', d.profileImage);
    setVal('admin-aboutImage', d.aboutImage);
    setVal('admin-stat-projects', d.stats.projects);
    setVal('admin-stat-clients', d.stats.clients);
    setVal('admin-stat-experience', d.stats.experience);
    setVal('admin-stat-awards', d.stats.awards);
    setVal('admin-social-github', d.social.github);
    setVal('admin-social-linkedin', d.social.linkedin);
    setVal('admin-social-twitter', d.social.twitter);
    setVal('admin-social-instagram', d.social.instagram);
    setVal('admin-social-dribbble', d.social.dribbble);
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

/* ============================================
   Save Handlers
   ============================================ */
function initSaveHandlers() {
    document.getElementById('savePersonal').addEventListener('click', () => {
        siteData.personal.name = getVal('admin-name');
        siteData.personal.logoText = getVal('admin-logoText');
        siteData.personal.greeting = getVal('admin-greeting');
        siteData.personal.email = getVal('admin-email');
        siteData.personal.phone = getVal('admin-phone');
        siteData.personal.location = getVal('admin-location');
        siteData.personal.availability = getVal('admin-availability');
        siteData.personal.experienceYears = getVal('admin-experienceYears');
        siteData.personal.projectsCount = getVal('admin-projectsCount');
        siteData.personal.description = getVal('admin-description');
        siteData.personal.aboutSubtitle = getVal('admin-aboutSubtitle');
        siteData.personal.aboutText = getVal('admin-aboutText');
        siteData.personal.titles = getVal('admin-titles').split('\n').filter((t) => t.trim());
        siteData.personal.profileImage = getVal('admin-profileImage');
        siteData.personal.aboutImage = getVal('admin-aboutImage');
        siteData.personal.stats.projects = parseInt(getVal('admin-stat-projects')) || 0;
        siteData.personal.stats.clients = parseInt(getVal('admin-stat-clients')) || 0;
        siteData.personal.stats.experience = parseInt(getVal('admin-stat-experience')) || 0;
        siteData.personal.stats.awards = parseInt(getVal('admin-stat-awards')) || 0;
        siteData.personal.social.github = getVal('admin-social-github');
        siteData.personal.social.linkedin = getVal('admin-social-linkedin');
        siteData.personal.social.twitter = getVal('admin-social-twitter');
        siteData.personal.social.instagram = getVal('admin-social-instagram');
        siteData.personal.social.dribbble = getVal('admin-social-dribbble');

        saveSiteData(siteData);
        showToast('Personal information saved!');
    });
}

/* ============================================
   Services CRUD
   ============================================ */
function renderServicesList() {
    const container = document.getElementById('servicesList');
    if (!container) return;

    if (siteData.services.length === 0) {
        container.innerHTML = `<div class="no-items"><i class="fas fa-cogs"></i><p>No services yet. Add your first service!</p></div>`;
        return;
    }

    container.innerHTML = siteData.services.map((service) => `
        <div class="admin-item-card">
            <div class="admin-item-icon"><i class="${service.icon}"></i></div>
            <div class="admin-item-info">
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            </div>
            <div class="admin-item-actions">
                <button class="admin-item-btn" onclick="editService(${service.id})" title="Edit">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="admin-item-btn delete" onclick="deleteItem('services', ${service.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function editService(id) {
    const service = siteData.services.find((s) => s.id === id);
    if (!service) return;

    openModal('Edit Service', `
        <div class="admin-field">
            <label>Icon Class (FontAwesome)</label>
            <input type="text" id="modal-icon" value="${service.icon}" placeholder="fas fa-code">
        </div>
        <div class="admin-field">
            <label>Title</label>
            <input type="text" id="modal-title" value="${service.title}">
        </div>
        <div class="admin-field">
            <label>Description</label>
            <textarea id="modal-desc" rows="3">${service.description}</textarea>
        </div>
    `, () => {
        service.icon = getVal('modal-icon');
        service.title = getVal('modal-title');
        service.description = getVal('modal-desc');
        saveSiteData(siteData);
        renderServicesList();
        showToast('Service updated!');
    });
}

function addNewService() {
    openModal('Add Service', `
        <div class="admin-field">
            <label>Icon Class (FontAwesome)</label>
            <input type="text" id="modal-icon" placeholder="fas fa-code">
        </div>
        <div class="admin-field">
            <label>Title</label>
            <input type="text" id="modal-title" placeholder="Service Title">
        </div>
        <div class="admin-field">
            <label>Description</label>
            <textarea id="modal-desc" rows="3" placeholder="Service description..."></textarea>
        </div>
    `, () => {
        const newId = siteData.services.length ? Math.max(...siteData.services.map((s) => s.id)) + 1 : 1;
        siteData.services.push({
            id: newId,
            icon: getVal('modal-icon') || 'fas fa-star',
            title: getVal('modal-title') || 'New Service',
            description: getVal('modal-desc') || 'Service description'
        });
        saveSiteData(siteData);
        renderServicesList();
        showToast('Service added!');
    });
}

/* ============================================
   Skills CRUD
   ============================================ */
function renderSkillsList() {
    const container = document.getElementById('skillsList');
    if (!container) return;

    if (siteData.skills.length === 0) {
        container.innerHTML = `<div class="no-items"><i class="fas fa-chart-bar"></i><p>No skills yet. Add your first skill!</p></div>`;
        return;
    }

    container.innerHTML = siteData.skills.map((skill) => `
        <div class="admin-item-card">
            <div class="admin-item-icon"><i class="${skill.icon}"></i></div>
            <div class="admin-item-info">
                <h4>${skill.name}</h4>
                <p>Proficiency level</p>
            </div>
            <div class="admin-item-meta">${skill.percentage}%</div>
            <div class="admin-item-actions">
                <button class="admin-item-btn" onclick="editSkill(${skill.id})" title="Edit">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="admin-item-btn delete" onclick="deleteItem('skills', ${skill.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function editSkill(id) {
    const skill = siteData.skills.find((s) => s.id === id);
    if (!skill) return;

    openModal('Edit Skill', `
        <div class="admin-field">
            <label>Skill Name</label>
            <input type="text" id="modal-name" value="${skill.name}">
        </div>
        <div class="admin-field">
            <label>Icon Class (FontAwesome)</label>
            <input type="text" id="modal-icon" value="${skill.icon}" placeholder="fab fa-js">
        </div>
        <div class="admin-field">
            <label>Percentage (0-100)</label>
            <input type="number" id="modal-percentage" value="${skill.percentage}" min="0" max="100">
        </div>
    `, () => {
        skill.name = getVal('modal-name');
        skill.icon = getVal('modal-icon');
        skill.percentage = parseInt(getVal('modal-percentage')) || 0;
        saveSiteData(siteData);
        renderSkillsList();
        showToast('Skill updated!');
    });
}

function addNewSkill() {
    openModal('Add Skill', `
        <div class="admin-field">
            <label>Skill Name</label>
            <input type="text" id="modal-name" placeholder="JavaScript">
        </div>
        <div class="admin-field">
            <label>Icon Class (FontAwesome)</label>
            <input type="text" id="modal-icon" placeholder="fab fa-js">
        </div>
        <div class="admin-field">
            <label>Percentage (0-100)</label>
            <input type="number" id="modal-percentage" value="80" min="0" max="100">
        </div>
    `, () => {
        const newId = siteData.skills.length ? Math.max(...siteData.skills.map((s) => s.id)) + 1 : 1;
        siteData.skills.push({
            id: newId,
            name: getVal('modal-name') || 'New Skill',
            icon: getVal('modal-icon') || 'fas fa-code',
            percentage: parseInt(getVal('modal-percentage')) || 80
        });
        saveSiteData(siteData);
        renderSkillsList();
        showToast('Skill added!');
    });
}

/* ============================================
   Projects CRUD
   ============================================ */
function renderProjectsList() {
    const container = document.getElementById('projectsList');
    if (!container) return;

    if (siteData.projects.length === 0) {
        container.innerHTML = `<div class="no-items"><i class="fas fa-project-diagram"></i><p>No projects yet. Add your first project!</p></div>`;
        return;
    }

    container.innerHTML = siteData.projects.map((project) => `
        <div class="admin-item-card">
            <div class="admin-item-icon"><i class="fas fa-folder"></i></div>
            <div class="admin-item-info">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
            </div>
            <div class="admin-item-meta">${project.category}</div>
            <div class="admin-item-actions">
                <button class="admin-item-btn" onclick="editProject(${project.id})" title="Edit">
                    <i class="fas fa-pen"></i>
                </button>
                <button class="admin-item-btn delete" onclick="deleteItem('projects', ${project.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function editProject(id) {
    const project = siteData.projects.find((p) => p.id === id);
    if (!project) return;

    openModal('Edit Project', `
        <div class="admin-field">
            <label>Title</label>
            <input type="text" id="modal-title" value="${project.title}">
        </div>
        <div class="admin-field">
            <label>Category</label>
            <input type="text" id="modal-category" value="${project.category}" placeholder="web, app, design">
        </div>
        <div class="admin-field">
            <label>Description</label>
            <textarea id="modal-desc" rows="3">${project.description}</textarea>
        </div>
        <div class="admin-field">
            <label>Image URL</label>
            <input type="text" id="modal-image" value="${project.image}">
        </div>
        <div class="admin-field">
            <label>Tags (comma separated)</label>
            <input type="text" id="modal-tags" value="${project.tags.join(', ')}">
        </div>
        <div class="admin-field">
            <label>Live Demo URL</label>
            <input type="url" id="modal-liveUrl" value="${project.liveUrl}">
        </div>
        <div class="admin-field">
            <label>GitHub URL</label>
            <input type="url" id="modal-githubUrl" value="${project.githubUrl}">
        </div>
    `, () => {
        project.title = getVal('modal-title');
        project.category = getVal('modal-category');
        project.description = getVal('modal-desc');
        project.image = getVal('modal-image');
        project.tags = getVal('modal-tags').split(',').map((t) => t.trim()).filter(Boolean);
        project.liveUrl = getVal('modal-liveUrl');
        project.githubUrl = getVal('modal-githubUrl');
        saveSiteData(siteData);
        renderProjectsList();
        showToast('Project updated!');
    });
}

function addNewProject() {
    openModal('Add Project', `
        <div class="admin-field">
            <label>Title</label>
            <input type="text" id="modal-title" placeholder="Project Title">
        </div>
        <div class="admin-field">
            <label>Category</label>
            <input type="text" id="modal-category" placeholder="web, app, design">
        </div>
        <div class="admin-field">
            <label>Description</label>
            <textarea id="modal-desc" rows="3" placeholder="Project description..."></textarea>
        </div>
        <div class="admin-field">
            <label>Image URL</label>
            <input type="text" id="modal-image" placeholder="https://...">
        </div>
        <div class="admin-field">
            <label>Tags (comma separated)</label>
            <input type="text" id="modal-tags" placeholder="React, Node.js, MongoDB">
        </div>
        <div class="admin-field">
            <label>Live Demo URL</label>
            <input type="url" id="modal-liveUrl" placeholder="https://...">
        </div>
        <div class="admin-field">
            <label>GitHub URL</label>
            <input type="url" id="modal-githubUrl" placeholder="https://github.com/...">
        </div>
    `, () => {
        const newId = siteData.projects.length ? Math.max(...siteData.projects.map((p) => p.id)) + 1 : 1;
        siteData.projects.push({
            id: newId,
            title: getVal('modal-title') || 'New Project',
            category: getVal('modal-category') || 'web',
            description: getVal('modal-desc') || 'Project description',
            image: getVal('modal-image') || 'https://via.placeholder.com/600x400/0a0a0a/39ff14?text=Project',
            tags: getVal('modal-tags').split(',').map((t) => t.trim()).filter(Boolean),
            liveUrl: getVal('modal-liveUrl') || '#',
            githubUrl: getVal('modal-githubUrl') || '#'
        });
        saveSiteData(siteData);
        renderProjectsList();
        showToast('Project added!');
    });
}

/* ============================================
   Gallery CRUD
   ============================================ */
function renderGalleryList() {
    const container = document.getElementById('galleryList');
    if (!container) return;

    if (siteData.gallery.length === 0) {
        container.innerHTML = `<div class="no-items"><i class="fas fa-images"></i><p>No photos yet. Add your first photo!</p></div>`;
        return;
    }

    container.innerHTML = siteData.gallery.map((item) => `
        <div class="admin-gallery-card">
            <img src="${item.image}" alt="${item.caption}" onerror="this.src='https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo'">
            <div class="admin-gallery-overlay">
                <p>${item.caption}</p>
                <div class="admin-gallery-actions">
                    <button class="admin-item-btn" onclick="editGalleryItem(${item.id})" title="Edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="admin-item-btn delete" onclick="deleteItem('gallery', ${item.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function editGalleryItem(id) {
    const item = siteData.gallery.find((g) => g.id === id);
    if (!item) return;

    openModal('Edit Photo', `
        <div class="admin-field">
            <label>Image URL</label>
            <input type="text" id="modal-image" value="${item.image}">
        </div>
        <div class="admin-field">
            <label>Caption</label>
            <input type="text" id="modal-caption" value="${item.caption}">
        </div>
    `, () => {
        item.image = getVal('modal-image');
        item.caption = getVal('modal-caption');
        saveSiteData(siteData);
        renderGalleryList();
        showToast('Photo updated!');
    });
}

function addNewGalleryItem() {
    openModal('Add Photo', `
        <div class="admin-field">
            <label>Image URL</label>
            <input type="text" id="modal-image" placeholder="https://...">
        </div>
        <div class="admin-field">
            <label>Caption</label>
            <input type="text" id="modal-caption" placeholder="Photo caption">
        </div>
    `, () => {
        const newId = siteData.gallery.length ? Math.max(...siteData.gallery.map((g) => g.id)) + 1 : 1;
        siteData.gallery.push({
            id: newId,
            image: getVal('modal-image') || 'https://via.placeholder.com/400x400/0a0a0a/39ff14?text=Photo',
            caption: getVal('modal-caption') || 'New Photo'
        });
        saveSiteData(siteData);
        renderGalleryList();
        showToast('Photo added!');
    });
}

/* ============================================
   Messages
   ============================================ */
function renderMessagesList() {
    const container = document.getElementById('messagesList');
    const badge = document.getElementById('msgBadge');
    if (!container) return;

    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    const unreadCount = messages.filter((m) => !m.read).length;
    if (badge) badge.textContent = unreadCount;

    if (messages.length === 0) {
        container.innerHTML = `<div class="no-items"><i class="fas fa-envelope-open"></i><p>No messages yet.</p></div>`;
        return;
    }

    container.innerHTML = messages.reverse().map((msg) => `
        <div class="message-card ${msg.read ? '' : 'unread'}">
            <div class="message-header">
                <div>
                    <div class="message-sender">${escapeHtml(msg.name)}</div>
                    <div class="message-email">${escapeHtml(msg.email)}</div>
                </div>
                <div class="message-date">${new Date(msg.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div class="message-subject">${escapeHtml(msg.subject)}</div>
            <div class="message-body">${escapeHtml(msg.message)}</div>
            <div class="message-actions">
                ${!msg.read ? `<button class="admin-item-btn" onclick="markRead(${msg.id})" title="Mark as read"><i class="fas fa-check"></i></button>` : ''}
                <button class="admin-item-btn delete" onclick="deleteMessage(${msg.id})" title="Delete"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function markRead(id) {
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    const msg = messages.find((m) => m.id === id);
    if (msg) {
        msg.read = true;
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        renderMessagesList();
    }
}

function deleteMessage(id) {
    openConfirm('Are you sure you want to delete this message?', () => {
        let messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        messages = messages.filter((m) => m.id !== id);
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        renderMessagesList();
        showToast('Message deleted!');
    });
}

/* ============================================
   Generic Delete
   ============================================ */
function deleteItem(type, id) {
    openConfirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`, () => {
        siteData[type] = siteData[type].filter((item) => item.id !== id);
        saveSiteData(siteData);

        switch (type) {
            case 'services': renderServicesList(); break;
            case 'skills': renderSkillsList(); break;
            case 'projects': renderProjectsList(); break;
            case 'gallery': renderGalleryList(); break;
        }

        showToast(`${type.charAt(0).toUpperCase() + type.slice(1, -1)} deleted!`);
    });
}

/* ============================================
   Add Handlers
   ============================================ */
function initAddHandlers() {
    document.getElementById('addService').addEventListener('click', addNewService);
    document.getElementById('addSkill').addEventListener('click', addNewSkill);
    document.getElementById('addProject').addEventListener('click', addNewProject);
    document.getElementById('addGalleryItem').addEventListener('click', addNewGalleryItem);
}

/* ============================================
   Modal System
   ============================================ */
let modalSaveCallback = null;

function initModal() {
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    document.getElementById('modalSave').addEventListener('click', () => {
        if (modalSaveCallback) modalSaveCallback();
        closeModal();
    });

    document.getElementById('confirmClose').addEventListener('click', closeConfirm);
    document.getElementById('confirmCancel').addEventListener('click', closeConfirm);
}

function openModal(title, bodyHtml, onSave) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('adminModal').classList.add('active');
    modalSaveCallback = onSave;
}

function closeModal() {
    document.getElementById('adminModal').classList.remove('active');
    modalSaveCallback = null;
}

let confirmCallback = null;

function openConfirm(text, onConfirm) {
    document.getElementById('confirmText').textContent = text;
    document.getElementById('confirmModal').classList.add('active');
    confirmCallback = onConfirm;

    document.getElementById('confirmDelete').onclick = () => {
        if (confirmCallback) confirmCallback();
        closeConfirm();
    };
}

function closeConfirm() {
    document.getElementById('confirmModal').classList.remove('active');
    confirmCallback = null;
}

/* ============================================
   Reset Data
   ============================================ */
function initReset() {
    document.getElementById('resetDataBtn').addEventListener('click', () => {
        openConfirm('Reset all data to defaults? This cannot be undone.', () => {
            localStorage.removeItem('portfolioSiteData');
            localStorage.removeItem('portfolioMessages');
            siteData = JSON.parse(JSON.stringify(defaultSiteData));
            loadPersonalData();
            renderServicesList();
            renderSkillsList();
            renderProjectsList();
            renderGalleryList();
            renderMessagesList();
            showToast('Data reset to defaults!');
        });
    });
}

/* ============================================
   Mobile Toggle
   ============================================ */
function initMobileToggle() {
    const toggle = document.getElementById('adminMobileToggle');
    const sidebar = document.getElementById('adminSidebar');

    if (toggle) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

/* ============================================
   Utilities
   ============================================ */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
