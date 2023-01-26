const Router = require("express");
const { check } = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controllers/authController')

const router = new Router();

router.post('/registration', 
	[
		check('email', "Incorrect email").isEmail(),
		check('password', "Password must be longer than 3 and shorter than 12").isLength({min: 3, max:12})
	],
	authController.registerUser)

router.post('/login', authController.loginUser)
router.get('/auth', authMiddleware, authController.checkAuth)
router.put('/auth', authMiddleware, authController.changeUsername)

module.exports = router;