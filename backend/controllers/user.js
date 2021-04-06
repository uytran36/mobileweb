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
      console.log(req.session.isLoggedIn);
      res.redirect('/admin/loggedIn');
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
        console.log(req.session.isLoggedIn);
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
  console.log(req.session.isLoggedIn);
  res.redirect('/admin');
}

exports.getAllProducts = (req, res, next) => {
  Product.find().then(
      (products) => {
          res.render('indexAdmin', {
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
  
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
      _id: req.params.id
  }).then(
      (product) => {
          res.render('detail', {product: product});
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
          res.redirect('/admin/loggedIn');
      }
  ).catch(
      (error) => {
          res.status(400).json(error);
      }
  );
};

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
          res.redirect('/admin/loggedIn');
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};
