var app = {};

/**
 * GET /users
 * @param req Request Object
 * @param res Response Object
 */
app.index = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

/**
 * GET /users/new
 * @param req Request Object
 * @param res Response Object
 */
app.new = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

/**
 * POST /users
 * @param req Request Object
 * @param res Response Object
 */
app.create = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

/**
 * GET /users/:id
 * @param req Request Object
 * @param res Response Object
 */
app.show = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

/**
 * GET / /users/:id/edit
 * @param req Request Object
 * @param res Response Object
 */
app.edit = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

/**
 * PUT /users/:id
 * @param req Request Object
 * @param res Response Object
 */
app.update = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

/**
 * DELETE /users/:id
 * @param req Request Object
 * @param res Response Object
 */
app.destroy = function(req, res){
  var users = {
    id: 'hoge'
  };
  res.json(users);
};

module.exports = app;

