const Product = require('../models/products');
const Bill = require('../models/bills');
const { render } = require('pug');


exports.createBill = (req, res, next) => {
    var product = JSON.parse(localStorage.getItem('listProduct'));
    console.log(product);
    const bill = new Bill({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        product: product,
        price: product.price
    });
    
    bill.save().then(
        () => {
            res.render('thanks');
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getBill = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        (product) => {
            res.render('bill', {product: product});
            if (typeof localStorage === "undefined" || localStorage === null) {
                const LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            
            localStorage.setItem('listProduct', JSON.stringify(product));
        }
    );
};