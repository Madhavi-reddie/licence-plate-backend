const router = require("express").Router();
const path = require('path');
const whitelistController = require(path.resolve(CONTROLLER_DIR, 'whitelist'));
const { authenticationMiddleware } = require(path.resolve(MIDDLEWARES, 'auth'))

router.post('/', authenticationMiddleware, whitelistController.create);
router.delete('/:id', authenticationMiddleware, whitelistController.delete);
router.get('/',  whitelistController.search);
router.post('/check' , whitelistController.check);

module.exports = router;
