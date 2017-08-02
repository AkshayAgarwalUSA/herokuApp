var express = require('express');
// var path = require('path');
var socket = require('socket.io');
// var logger = require('morgan');
// var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));

// app.get('/', )
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socket(server)

io.on('connection', function(socket){

  console.log('socket is there',socket.id);

  socket.on('app', function (data){

    console.log('data', data['input']);
    socket.emit('cb', data);
    socket.emit('sockets', io.sockets)
  })
});
