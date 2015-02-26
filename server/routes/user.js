module.exports = {
   index: function(req, res){
    res.send("index: called as GET method");
  }
  ,new: function(req, res){
    res.send("new: called as GET method");
  }
  ,create: function(req, res){
    res.send("create: called as POST method");
  }
  ,show: function(req, res){
    res.send("show: called as GET method");
  }
  ,edit: function(req, res){
    res.send("edit: called as GET method");
  }
  ,update: function(req, res){
    res.send("update: called as PUT method");
  }
  ,destroy: function(req, res){
    res.send("destroy: called as DELETE method");
  }
};
