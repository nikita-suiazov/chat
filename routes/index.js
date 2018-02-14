var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app){

  app.get('/', function(req, res, next){
    res.render('index');
  });

  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users){
      if (err) return next(err);
      res.json(users);
    });
  });

  app.get('/user/:id', function(req, res, next) {
    try {
      var id = new ObjectID(req.params.id);
    } catch (e) {
      return next(404);
    }

    User.findById(id, function(err, user){
      if (err) {
        return next(err);
      }
      else {
        if(!user) {
          next(new HttpError(404, 'User not found'));
        }
        else {
          res.json(user);
        }
      }
    });
  });

};


// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', {
//     title: 'Express',
//     body: 'SUKA'
//   });
// });
//
// module.exports = router;
