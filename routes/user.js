var express = require('express');
var router = express.Router();

/* GET user. */
var User = require('../models/user').User;
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user){
    if (err) return next(err);
    if (!user) {
      next(new HttpError(404, "User not found"));
    }
    res.json(user);
  });

});

module.exports = router;
