import { createNotification } from '../components/notification.js';

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('login_email');
const loginPassword = document.getElementById('login_password');
const loginBtn = document.getElementById('login-btn');
const adminModal = document.getElementById('admin-modal');
const adminLoginBtn = document.getElementById('admin-login-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const adminPasswordInput = document.getElementById('admin_password');
const adminSubmitBtn = document.getElementById('admin-submit-btn');

// Validation regex
const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular Login Validation
const validateLoginForm = () => {
    const isEmailValid = emailVal.test(loginEmail.value);
    const isPasswordValid = loginPassword.value.trim().length >= 8;
    loginBtn.disabled = !(isEmailValid && isPasswordValid);
};

// Admin Login Validation
const validateAdminLogin = () => {
    const isValid = adminPasswordInput.value.trim().length >= 8;
    adminSubmitBtn.disabled = !isValid;
};

// Event Listeners
loginEmail.addEventListener('input', validateLoginForm);
loginPassword.addEventListener('input', validateLoginForm);
adminPasswordInput.addEventListener('input', validateAdminLogin);

// Modal Handling
adminLoginBtn.addEventListener('click', () => adminModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => adminModal.classList.add('hidden'));

// Regular Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('/api/auth/login', {
            email: loginEmail.value.trim().toLowerCase(),
            password: loginPassword.value.trim()
        });

        if (response.data.success) {
            createNotification(false, 'Login successful!');
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Redirect based on role
            setTimeout(() => {
                window.location.href = response.data.user.role === 'admin' 
                    ? '/admin-home' 
                    : '/staff-home';
            }, 1500);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Login failed';
        createNotification(true, errorMessage);
        console.error('Login error:', error);
    }
});


// Admin Login Handler
adminSubmitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const adminPassword = adminPasswordInput.value.trim();

    if (!adminPassword) {
        createNotification(true, 'Please enter admin password');
        return;
    }

    try {
        const response = await axios.post('/api/auth/admin-login', {
            password: adminPassword
        });

        if (response.data.success) {
            createNotification(false, 'Admin access granted');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            setTimeout(() => {
                window.location.href = '/staff-home';
            }, 1500);
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Admin authentication failed';
        createNotification(true, errorMessage);
        console.error('Admin login error:', error);
    }
});