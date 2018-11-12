const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/frontend'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var todos = [];

app.post('/todos', function(req, res) {
  todos.push(req.body.todo);
  res.status(201).json({'todo': req.body.todo});
});


app.get('/todos', function(req, res) {
  res.status(200).json({'todos': todos});
});

app.listen(8000, function(){
  console.log("ready captain.");
});
