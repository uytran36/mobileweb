const Product = require('../models/products');
const { render } = require('pug');


exports.createProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    });
    product.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllProducts = (req, res, next) => {
    Product.find().then(
        (products) => {
            res.render('index', {
                products: products
            });
            
            if (typeof localStorage === "undefined" || localStorage === null) {
                const LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            
            localStorage.setItem('listProduct', JSON.stringify(products));
            //console.log(localStorage.getItem('listProduct'));
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
    
};

exports.getOneProduct = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({ 
                error: error
            });
        }
    );
};

exports.modifyProduct = (req, res, next) => {
    const product = new Product({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
    });
    Product.updateOne({_id: req.params.id}, product).then(
        () => {
            res.status(201).json({
                message: 'Updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.deleteProduct = (req, res, next) => {
    Product.remove({_id: req.params.id}).then(
        () => {
            res.status(201).json({
                message: 'deleted!'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.getIPhoneProducts = (req, res, next) => {
    Product.find({
        type: 'iphone'
    }).then(
        (products) => {
            res.render('index', {
                products: products
            });

            if (typeof localStorage === "undefined" || localStorage === null) {
                const LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            
            localStorage.setItem('listProduct', JSON.stringify(products));
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.getSamsungProducts = (req, res, next) => {
    Product.find({
        type: 'samsung'
    }).then(
        (products) => {
            res.render('index', {
                products: products
            });

            if (typeof localStorage === "undefined" || localStorage === null) {
                const LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            
            localStorage.setItem('listProduct', JSON.stringify(products));
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.getXiaomiProducts = (req, res, next) => {
    Product.find({
        type: 'xiaomi'
    }).then(
        (products) => {
            res.render('index', {
                products: products
            });

            if (typeof localStorage === "undefined" || localStorage === null) {
                const LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            
            localStorage.setItem('listProduct', JSON.stringify(products));
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.findByName = (req, res, next) => {
    var searchQuery = req.query.search;
    Product.find({
        title:{$regex: searchQuery, $options: 'i'}
    }).then(
        (products) => {
            res.render('index', {
                products: products
            });

            if (typeof localStorage === "undefined" || localStorage === null) {
                const LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }
            
            localStorage.setItem('listProduct', JSON.stringify(products));
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.sortAsc = (req, res, next) => {
    var listProduct = JSON.parse(localStorage.getItem('listProduct'));
    listProduct.sort(function(a, b){
        return a.price- b.price;
    });
    res.render('index', {
        products: listProduct
    });
}

exports.sortDes = (req, res, next) => {
    var listProduct = JSON.parse(localStorage.getItem('listProduct'));
    listProduct.sort(function(a, b){
        return b.price- a.price;
    });
    res.render('index', {
        products: listProduct
    });
}

exports.sortBelow3 = (req, res, next) => {
    var listProduct = JSON.parse(localStorage.getItem('listProduct'));
    var results = [];
    var searchField = "price";
    var searchVal = 3000000;
    
    for (var i = 0 ; i < listProduct.length ; i++) {
        if (listProduct[i][searchField] <= searchVal) {
            results.push(listProduct[i]);
        }
    }

    res.render('index', {
        products: results
    });
}

exports.sortFrom3To7 = (req, res, next) => {
    var listProduct = JSON.parse(localStorage.getItem('listProduct'));
    var results = [];
    var searchField = "price";
    var fromValue = 3000000;
    var toValue = 7000000
    
    for (var i = 0 ; i < listProduct.length ; i++) {
        if (listProduct[i][searchField] >= fromValue && listProduct[i][searchField] <= toValue) {
            results.push(listProduct[i]);
        }
    }

    res.render('index', {
        products: results
    });
}

exports.sortOver7 = (req, res, next) => {
    var listProduct = JSON.parse(localStorage.getItem('listProduct'));
    var results = [];
    var searchField = "price";
    var searchVal = 7000000;
    
    for (var i = 0 ; i < listProduct.length ; i++) {
        if (listProduct[i][searchField] >= searchVal) {
            results.push(listProduct[i]);
        }
    }

    res.render('index', {
        products: results
    });
}