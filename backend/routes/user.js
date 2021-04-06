const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//router.get('/admin', userCtrl.login);
//router.get('/login', userCtrl.loginForm);
router.get('/', userCtrl.Home);
router.get('/loggedin', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/listproduct', userCtrl.getAllProducts);
router.post('/loggedin', userCtrl.loggedin);
router.put('/edit/:id', userCtrl.modifyProduct);
router.get('/edit/:id', userCtrl.getOneProduct);
router.post('/', userCtrl.createProduct);

module.exports = router;