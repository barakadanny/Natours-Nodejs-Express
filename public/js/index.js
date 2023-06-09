import { login, logout } from './login'
import { signup } from './signup'
import { updateSettings } from './updateSettings'

// DOM elements
const loginForm = document.querySelector('.form')
const signupForm = document.querySelector('.signupForm')
const logOutBtn = document.querySelector('.logoutBtn')
const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')

if (loginForm)
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        login(email, password);
        
    })

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (signupForm)
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const passwordConfirm = document.querySelector('#passwordConfirm').value;
        signup(name, email, password, passwordConfirm);
    })

if (userDataForm)
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.querySelector('#name').value);
        form.append('email', document.querySelector('#email').value);
        form.append('photo', document.querySelector('#photo').files[0]);

        updateSettings(form, 'data');
    });

if (userPasswordForm)
    userPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn-save__password').textContent = 'Updating...';

        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;

        await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');

        document.querySelector('.btn-save__password').textContent = 'Save password';
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
