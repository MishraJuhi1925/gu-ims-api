/**
 * @description contain main routes only accessible for admin.
 */

const AuthController = require('../controllers/auth');
const multer = require('multer');
const router = require('express').Router()

const upload = multer({ dest: './app/uploads/' })

// router.post('/login', (req, res, next) => {
//     AuthController.login(req.body).then(data => res.json({
//         success: true,
//         data,
//         message: `Welcome ${data.user.role}`
//     })).catch(err => next(err))
// })



module.exports = router;