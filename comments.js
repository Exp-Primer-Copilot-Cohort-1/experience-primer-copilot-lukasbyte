// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Create a json file
var comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Create a route to get all comments
app.get('/comments', function(req, res){
  res.json(comments);
});

// Create a route to post a comment
app.post('/comments', function(req, res){
  comments.push(req.body);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comments);
});

// Create a route to delete a comment
app.delete('/comments/:id', function(req, res){
  comments = comments.filter(function(comment){
    return comment.id != req.params.id;
  });
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comments);
});

// Create a route to update a comment
app.put('/comments/:id', function(req, res){
  comments = comments.map(function(comment){
    if(comment.id == req.params.id){
      return req.body;
    } else {
      return comment;
    }
  });
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comments);
});

// Create a web server
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});