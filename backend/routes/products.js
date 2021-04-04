const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff.js');
const billCtrl = require('../controllers/bill');

router.get('/', stuffCtrl.getAllProducts);
router.get('/iphone', stuffCtrl.getIPhoneProducts);
router.get('/samsung', stuffCtrl.getSamsungProducts);
router.get('/xiaomi', stuffCtrl.getXiaomiProducts);
router.get('/search', stuffCtrl.findByName);
router.get('/sortAsc', stuffCtrl.sortAsc);
router.get('/sortDes', stuffCtrl.sortDes);
router.get('/sortBelow3', stuffCtrl.sortBelow3);
router.get('/sortFrom3To7', stuffCtrl.sortFrom3To7);
router.get('/sortOver7', stuffCtrl.sortOver7);
router.get('/bill/:id', billCtrl.getBill);

router.post('/thanks', billCtrl.createBill);

router.get('/login', (req, res) => {
    res.render('login');
});

// router.post('/', stuffCtrl.createProduct);
// router.get('/:id', stuffCtrl.getOneProduct);
// router.put('/:id', stuffCtrl.modifyProduct);
// router.delete('/:id', stuffCtrl.deleteProduct);


module.exports = router;