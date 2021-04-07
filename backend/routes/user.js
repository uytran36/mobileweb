const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.Home);
router.get('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.post('/login', userCtrl.loggedin);
router.get('/listproduct', userCtrl.getAllProducts);
router.get('/edit/:id', userCtrl.getOneProduct);
//router.put('/edit/:id', userCtrl.modifyProduct);
router.post('/listproduct', userCtrl.modifyProduct);
router.get('/deleteproduct', userCtrl.deleteProduct);
router.get('/addproduct', userCtrl.addProduct);
router.post('/listproduct', userCtrl.createProduct)
router.get('/listbill', userCtrl.getAllBills);
router.get('/editbill/:id', userCtrl.getOneBill);
router.post('/listbill', userCtrl.modifyBill);
router.get('/deletebill', userCtrl.deleteBill);
module.exports = router;