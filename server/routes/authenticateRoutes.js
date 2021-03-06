var authenticationService = require('./../src/services/authentication_service.js');

exports.authenticate = function(req, res) {
  res.render('authenticate', { layout: 'authenticate', title: 'Feature toggles: Authenticate', pageHeader: 'Authenticate' });
};

exports.login = function(req, res) {
  authenticationService.login(req.body.username, req.body.password, function(result) {
    if (result) {
      req.session.user = { isAuthenticated: true, username: req.body.username };
      res.redirect('/dashboard');
    }
    else{
      res.redirect('/');
    }
  });  
};

exports.logout = function(req, res) {
  if (req.session.user) {
    delete req.session.user;
  }
  res.redirect("/");
};