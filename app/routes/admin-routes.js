/**
 * @description contain main routes only accessible for admin.
 */

const UserController = require('../controllers/users.js');

const router = require('express').Router()


router.post('/signup', (req, res, next) => {
    UserController.signup(req.body).then(data => res.json({
        success: true,
        data,
        message: 'Registration successful'
    })).catch(err => next(err))
})

router.post('/login', (req, res, next) => {
    UserController.login(req.body).then(data => res.json({
        success: true,
        data,
        message: `Welcome ${data.user.role}`
    })).catch(err => next(err))
})

router.post('/update-password', (req, res, next) => {
    console.log(req.body)
    UserController.update_password(req.body).then(data => res.json({
        success: true,
        data,
        message: 'Password update successful'
    })).catch(err => next(err))
})

module.exports = router;