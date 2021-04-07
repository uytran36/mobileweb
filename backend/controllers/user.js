const Product = require('../models/products');
const Bill = require('../models/bills');
const User = require('../models/users');
const { render } = require('pug');
// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then(
//         (hash) => {
//         const user = new User({
//             username: req.body.username,
//             password: hash
//         });
//         user.save().then(
//             () => {
//             res.status(201).json({
//                 message: 'User added successfully!'
//             });
//             }
//         ).catch(
//             (error) => {
//             res.status(500).json({
//                 error: error
//             });
//         });
//     });
// };

// exports.login = (req, res, next) => {
//     User.findOne({ username: req.body.username }).then(
//       (user) => {
//         if (!user) {
//           return res.status(401).json({
//             error: new Error('User not found!')
//           });
//         }
//         req.body.password.localeCompare(user.password).then(
//           (valid) => {
//             if (!valid) {
//               return res.status(401).json({
//                 error: new Error('Incorrect password!')
//               });
//             }
//             Product.find().then(
//               (products) => {
//                   res.render('indexAdmin', {
//                       products: products
//                   });
//               }
//             ).catch(
//                 (error) => {
//                     res.status(400).json({
//                         error: error
//                     });
//                 }
//             );
//           }
//         ).catch(
//           (error) => {
//             res.status(500).json({
//               error: error
//             });
//           }
//         );
//       }
//     ).catch(
//       (error) => {
//         res.status(500).json({
//           error: error
//         });
//       }
//     );
// }

exports.loginForm = (req, res, next) => {
  res.render('login');
}

exports.Home = (req, res, next) => {
  if(req.session.isLoggedIn) {
    Product.find().then(
      (products) => {
          res.render('indexAdmin', {
              products: products
          });
      }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
  }
  else {
    res.render('login');
  }
      
};

exports.loggedin = (req,res, next) => {
  User.findOne({ username: req.body.username }).then(
    (user) => {     
      if(!user) {
        req.session.isLoggedIn = false;
        return res.render('loginFail');
      }
    
      if(user.password != req.body.password) {
        req.session.isLoggedIn = false;
        return res.render('loginFail');
      }
      req.session.isLoggedIn = true;
      res.redirect('/admin/logIn');
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error:error
      })
    }
  );
};

exports.login = (req,res, next) => {
  if(req.session.isLoggedIn) {
    Product.find().then(
      (products) => {
        res.render('indexAdmin', {
            products: products
        });
      }
    ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
    );
  }
  else {
    res.redirect('/admin');
  }
      
};

exports.logout = (req, res, next) => {
  req.session.isLoggedIn = false;
  res.redirect('/admin');
}

exports.getAllProducts = (req, res, next) => {
  Product.find().then(
      (products) => {
          res.render('indexAdmin', {
              products: products
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

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
      _id: req.params.id
  }).then(
      (product) => {
          res.render('detail', {product: product});

          if (typeof localStorage === "undefined" || localStorage === null) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          }
          
          localStorage.setItem('product', JSON.stringify(product));
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
  var p = JSON.parse(localStorage.getItem('product'));

  const product = new Product({
      _id: p._id,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
  });
  
  Product.updateOne({_id: p._id}, product).then(
      () => {
        console.log("updated!");
        res.redirect('/admin/listproduct');
      }
  ).catch(
      (error) => {
          res.status(400).json(error);
      }
  );
};

exports.addProduct = (req, res, next) => {
  res.render('addProduct');
}

exports.createProduct = (req, res, next) => {
  const product = new Product({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      imageUrl: req.body.imageUrl,
      price: req.body.price
  });
  product.save().then(
      () => {
          res.redirect('/admin/listproduct');
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};

exports.deleteProduct = (req, res, next) => {
  var p = JSON.parse(localStorage.getItem('product'));

  Product.remove({_id: p._id}).then(
      () => {
        console.log("deleted!");
        res.redirect('/admin/listproduct');
      }
  ).catch(
      (error) => {
          res.status(400).json(error);
      }
  );
};


exports.getAllBills = (req, res, next) => {
  Bill.find().then(
      (bills) => {
          res.render('listBill', {
              bills: bills
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


exports.getOneBill = (req, res, next) => {
  Bill.findOne({
      _id: req.params.id
  }).then(
      (bill) => {
          res.render('billDetail', {bill: bill, product: bill.product});

          if (typeof localStorage === "undefined" || localStorage === null) {
            const LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          }
          
          localStorage.setItem('bill', JSON.stringify(bill));
      }
  ).catch(
      (error) => {
          res.status(404).json({ 
              error: error
          });
      }
  );
};


exports.modifyBill = (req, res, next) => {
  var b = JSON.parse(localStorage.getItem('bill'));

  const bill = new Bill({
      _id: b._id,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      product: b.product,
      price: req.body.price,
  });
  
  Bill.updateOne({_id: b._id}, bill).then(
      () => {
        console.log("updated!");
        res.redirect('/admin/listbill');
      }
  ).catch(
      (error) => {
          res.status(400).json(error);
      }
  );
};

exports.deleteBill = (req, res, next) => {
  var b = JSON.parse(localStorage.getItem('bill'));

  Bill.remove({_id: b._id}).then(
      () => {
        console.log("deleted!");
        res.redirect('/admin/listbill');
      }
  ).catch(
      (error) => {
          res.status(400).json(error);
      }
  );
};
