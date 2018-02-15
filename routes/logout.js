exports.post = function(req, res) {
  console.log("ssssuuullllaaaa");
  req.session.destroy();
  res.redirect('/');
};
