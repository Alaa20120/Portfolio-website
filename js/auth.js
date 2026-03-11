/* ============================================
   ADMIN AUTHENTICATION SYSTEM
   - SHA-256 hashed password storage
   - Session management with expiry
   ============================================ */

const AUTH_STORAGE_KEY = 'portfolioAdminAuth';
const SESSION_KEY = 'portfolioAdminSession';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours

/* ============================================
   SHA-256 Hashing (Web Crypto API)
   ============================================ */
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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

/* ============================================
   Initialize Auth
   ============================================ */
function initAuth() {
    // Check for existing valid session
    if (isSessionValid()) {
        showDashboard();
        return;
    }

    showLoginScreen();

    // Setup form handler
    document.getElementById('setupForm').addEventListener('submit', async (e) => {
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

        const hashedPassword = await hashPassword(password);
        const hashedEmail = await hashPassword(email.toLowerCase());

        const credentials = {
            emailHash: hashedEmail,
            passwordHash: hashedPassword,
            createdAt: Date.now()
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials));
        createSession();
        showDashboard();
    });

    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const credentials = getStoredCredentials();
        if (!credentials) {
            showLoginError('No account found. Please set up first.');
            return;
        }

        const hashedEmail = await hashPassword(email.toLowerCase());
        const hashedPassword = await hashPassword(password);

        if (hashedEmail !== credentials.emailHash || hashedPassword !== credentials.passwordHash) {
            showLoginError('Invalid email or password!');
            return;
        }

        createSession();
        showDashboard();
    });

    // Logout handler
    document.getElementById('logoutBtn').addEventListener('click', () => {
        destroySession();
        showLoginScreen();
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    });
}

function showLoginError(message) {
    const errorEl = document.getElementById('loginError');
    if (!errorEl) {
        // For setup form, create a temporary error display
        const setupForm = document.getElementById('setupForm');
        let tempError = setupForm.querySelector('.login-error');
        if (!tempError) {
            tempError = document.createElement('div');
            tempError.className = 'login-error';
            setupForm.appendChild(tempError);
        }
        tempError.textContent = message;
        tempError.style.display = 'block';
        setTimeout(() => { tempError.style.display = 'none'; }, 4000);
        return;
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => { errorEl.style.display = 'none'; }, 4000);
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', initAuth);
