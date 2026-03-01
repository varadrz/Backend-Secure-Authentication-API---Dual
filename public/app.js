const API_BASE = '/api/auth';

function showNotification(message, type = 'success') {
    const toast = document.getElementById('notification');
    toast.textContent = message;
    toast.style.display = 'block';
    toast.className = type;

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function toggleView(view) {
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');

    if (view === 'register') {
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
    } else {
        loginView.classList.remove('hidden');
        registerView.classList.add('hidden');
    }
}

function checkAuth() {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    const authSection = document.getElementById('auth-section');
    const userSection = document.getElementById('user-section');
    const adminSection = document.getElementById('admin-section');

    // Hide dashboards by default
    userSection.style.display = 'none';
    adminSection.style.display = 'none';

    if (token && user) {
        authSection.classList.add('hidden');
        if (user.role === 'admin') {
            adminSection.style.display = 'block';
        } else {
            userSection.style.display = 'block';
            document.getElementById('user-name-display').textContent = `Logged in as: ${user.username || 'User'}`;
        }
    } else {
        authSection.classList.remove('hidden');
    }
}

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            showNotification('Registered successfully!');
            toggleView('login');
        } else {
            showNotification(data.message || 'Error', 'error');
        }
    } catch (err) {
        showNotification('Connection error', 'error');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify({
                email,
                role: data.role,
                username: email.split('@')[0]
            }));

            showNotification('Logged in!');
            checkAuth();
        } else {
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (err) {
        showNotification('Connection error', 'error');
    }
});

async function checkAdminStatus() {
    const token = localStorage.getItem('accessToken');
    const resultDiv = document.getElementById('admin-result');

    try {
        const res = await fetch('/admin', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
            resultDiv.textContent = data.message;
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = data.message;
            resultDiv.style.color = 'red';
        }
    } catch (err) {
        resultDiv.textContent = 'Error';
    }
}

function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    checkAuth();
}

window.addEventListener('load', checkAuth);
