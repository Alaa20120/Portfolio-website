/* ============================================
   ADMIN AUTHENTICATION SYSTEM
   - Secure hash password storage
   - Session management with expiry
   - Works on file://, http://, and https://
   ============================================ */

const AUTH_STORAGE_KEY = 'portfolioAdminAuth';
const SESSION_KEY = 'portfolioAdminSession';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours

/* ============================================
   Hash Function (works everywhere)
   ============================================ */
function hashString(str) {
    let hash1 = 5381;
    let hash2 = 52711;
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        hash1 = ((hash1 << 5) + hash1 + ch) >>> 0;
        hash2 = ((hash2 << 5) + hash2 + ch) >>> 0;
    }
    const part1 = hash1.toString(16).padStart(8, '0');
    const part2 = hash2.toString(16).padStart(8, '0');

    let hash3 = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
        hash3 ^= str.charCodeAt(i);
        hash3 = (hash3 * 0x01000193) >>> 0;
    }
    const part3 = hash3.toString(16).padStart(8, '0');

    let hash4 = 0;
    for (let i = 0; i < str.length; i++) {
        hash4 = str.charCodeAt(i) + ((hash4 << 6) + (hash4 << 16) - hash4);
        hash4 = hash4 >>> 0;
    }
    const part4 = hash4.toString(16).padStart(8, '0');

    return part1 + part2 + part3 + part4;
}

/* ============================================
   Auth State Management
   ============================================ */
function getStoredCredentials() {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

function isSessionValid() {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return false;
    try {
        const parsed = JSON.parse(session);
        if (Date.now() > parsed.expiresAt) {
            localStorage.removeItem(SESSION_KEY);
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

function createSession() {
    const session = {
        loggedIn: true,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function destroySession() {
    localStorage.removeItem(SESSION_KEY);
}

/* ============================================
   UI Control
   ============================================ */
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminLayout').style.display = 'none';

    const credentials = getStoredCredentials();
    if (credentials) {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('setupForm').style.display = 'none';
    } else {
        document.getElementById('setupForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    }
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminLayout').style.display = 'grid';
}

function showLoginError(message) {
    // Try loginError first (login form)
    const loginErr = document.getElementById('loginError');
    if (loginErr && document.getElementById('loginForm').style.display !== 'none') {
        loginErr.textContent = message;
        loginErr.style.display = 'block';
        setTimeout(() => { loginErr.style.display = 'none'; }, 4000);
        return;
    }

    // For setup form
    const setupForm = document.getElementById('setupForm');
    let tempError = document.getElementById('setupError');
    if (!tempError) {
        tempError = document.createElement('div');
        tempError.id = 'setupError';
        tempError.className = 'login-error';
        setupForm.appendChild(tempError);
    }
    tempError.textContent = message;
    tempError.style.display = 'block';
    setTimeout(() => { tempError.style.display = 'none'; }, 4000);
}

/* ============================================
   Initialize Auth - called BEFORE admin.js
   Returns true if authenticated
   ============================================ */
let isAuthenticated = false;

function initAuth() {
    // Check for existing valid session
    if (isSessionValid()) {
        isAuthenticated = true;
        showDashboard();
    } else {
        isAuthenticated = false;
        showLoginScreen();
    }

    // Setup form handler (create account)
    document.getElementById('setupForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('setupEmail').value.trim();
        const password = document.getElementById('setupPassword').value;
        const confirm = document.getElementById('setupConfirm').value;

        if (password !== confirm) {
            showLoginError('Passwords do not match!');
            return;
        }

        if (password.length < 6) {
            showLoginError('Password must be at least 6 characters!');
            return;
        }

        const credentials = {
            emailHash: hashString(email.toLowerCase()),
            passwordHash: hashString(password),
            createdAt: Date.now()
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials));
        createSession();
        isAuthenticated = true;
        showDashboard();
        // Initialize admin dashboard after login
        if (typeof initAdminDashboard === 'function') initAdminDashboard();
    });

    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const credentials = getStoredCredentials();
        if (!credentials) {
            showLoginError('No account found!');
            return;
        }

        const emailHash = hashString(email.toLowerCase());
        const passwordHash = hashString(password);

        if (emailHash !== credentials.emailHash || passwordHash !== credentials.passwordHash) {
            showLoginError('Invalid email or password!');
            return;
        }

        createSession();
        isAuthenticated = true;
        showDashboard();
        // Initialize admin dashboard after login
        if (typeof initAdminDashboard === 'function') initAdminDashboard();
    });

    // Logout handler
    document.getElementById('logoutBtn').addEventListener('click', function () {
        destroySession();
        isAuthenticated = false;
        showLoginScreen();
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    });
}

// Initialize auth immediately when DOM is ready
document.addEventListener('DOMContentLoaded', initAuth);
