// import { createNotification } from "../components/notification.js"
const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#floating_email');
const passwordInput = document.querySelector('#floating_password');
const matchInput = document.querySelector('#floating_repeat_password');
const firstNameInput = document.querySelector('#floating_first_name');
const lastNameInput = document.querySelector('#floating_last_name');
const submitBtn = document.querySelector('#submit-btn');
const notification = document.querySelector('#notification')
import { createNotification } from "../components/notification.js";

console.log(axios)


let valEmail = false
let valPassword = false
let valMatch = false
let valName = false

// Validation regex
const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validateForm = () => {
    submitBtn.disabled = !(valEmail && valPassword && valMatch && valName);
};

// Fix border color classes (Tailwind requires full class names)
const showError = (element, message) => {
    element.nextElementSibling.classList.remove('hidden');
    element.nextElementSibling.textContent = message;
    element.classList.add('border-red-500'); // Changed from border-b-red-500
    element.classList.remove('border-green-500');
};

const showSuccess = (element) => {
    element.nextElementSibling.classList.add('hidden');
    element.classList.add('border-green-500');
    element.classList.remove('border-red-500');
};


// Email validation
emailInput.addEventListener('input', (e) => {
    const isValid = emailVal.test(e.target.value);
    if (isValid) {
        showSuccess(e.target);
        valEmail = true;
    } else {
        showError(e.target, 'Please enter a valid email address');
        valEmail = false;
    }
    validateForm();
});

// Password validation
passwordInput.addEventListener('input', (e) => {
    const isValid = passwordVal.test(e.target.value);
    if (isValid) {
        showSuccess(e.target);
        valPassword = true;
    } else {
        showError(e.target, 'Minimum 8 chars with uppercase, lowercase & number');
        valPassword = false;
    }
    validateForm();
});

// Password match validation
matchInput.addEventListener('input', (e) => {
    const isValid = e.target.value === passwordInput.value;
    if (isValid) {
        showSuccess(e.target);
        valMatch = true;
    } else {
        showError(e.target, 'Passwords do not match');
        valMatch = false;
    }
    validateForm();
});

// Name validation
[firstNameInput, lastNameInput].forEach(input => {
    input.addEventListener('input', (e) => {
        const isValid = e.target.value.trim().length >= 2;
        if (isValid) {
            showSuccess(e.target);
            valName = true;
        } else {
            showError(e.target, 'Minimum 2 characters required');
            valName = false;
        }
        validateForm();
    });
});



// Example usage
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const newUser = {
            name: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        const response = await axios.post('/api/users', newUser);
        createNotification(false, 'Registration successful!');
        formulario.reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Registration failed';
        createNotification(true, errorMessage);
        console.error('Registration error:', error);
    }
});
