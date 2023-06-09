const express = require('express');
const { 
        getHomeTours, 
        getOverview, 
        getTour, 
        getLoginForm, 
        getAccount, 
        getSignUpForm 
    } = require('../controllers/viewsController');

const { isLoggedIn, protect } = require('../controllers/authController')

const router = express.Router();

router.get('/', isLoggedIn, getHomeTours)

router.get('/tours', isLoggedIn, getOverview)

router.get('/tour/:slug', isLoggedIn, getTour)

router.get('/login', isLoggedIn, getLoginForm)

router.get('/me', protect, getAccount)

router.get('/signup', getSignUpForm)

module.exports = router