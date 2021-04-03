const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff.js');

router.get('/', stuffCtrl.getAllProducts);
router.get('/iphone', stuffCtrl.getIPhoneProducts);
router.get('/samsung', stuffCtrl.getSamsungProducts);
router.get('/xiaomi', stuffCtrl.getXiaomiProducts);
router.get('/find/:query', stuffCtrl.findByName);

// router.post('/', stuffCtrl.createProduct);
// router.get('/:id', stuffCtrl.getOneProduct);
// router.put('/:id', stuffCtrl.modifyProduct);
// router.delete('/:id', stuffCtrl.deleteProduct);


module.exports = router;