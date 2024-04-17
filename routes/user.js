const router = require("express").Router();
const path = require('path');
const UserController = require(path.resolve(CONTROLLER_DIR, 'user'));
const { authenticationMiddleware } = require(path.resolve(MIDDLEWARES, 'auth'))

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

router.get('/', authenticationMiddleware,UserController.search);

module.exports = router;
