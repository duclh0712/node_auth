const epxress = require('express');
const router = epxress.Router();

// Controller
const homeController = require('../controllers/home.controller')

router.post('/registed', homeController.registed)
router.get('/register', homeController.register)
router.post('/me', homeController.me)
router.get('/logout', homeController.logout)
router.get('/login', homeController.login)
router.get('/dashboard', homeController.dashboard)
router.get('/', homeController.home)
module.exports = router