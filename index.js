var express = require('express');
// var path = require('path');
var mongoose = require('mongoose');
var socket = require('socket.io');
// var logger = require('morgan');
// var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/test1', {
        useMongoClient: true,
});

var db = mongoose.connection;

var Tags = mongoose.model('Tags', { epc: String, Anteena: String, Flag: String });

/*var tag = new Tags({ epc: 'b', Anteena: '1' });
tag.save(function (err) {
  if (err){
    console.log(err);
  } else {
    console.log('Tag saved');
  }
});*/

app.set('port', process.env.PORT || 3000);
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(function(request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(express.static('public'));

app.get('/', function(err, res){

  res.send("this isthe server");
  
})
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socket(server)

io.on('connection', function(socket){

  console.log('socket is there',socket.id);
  var list = Object.keys(io.sockets.sockets);
  io.sockets.emit('socketCount', list);

  socket.on('app', function (data){
    
    var list = Object.keys(io.sockets.sockets);
//    console.log('data', data['input']['EPC']);
    Tags.find({epc: data['input']['EPC'], Flag: '0'}, function(err, tagsFromDB){
	if(tagsFromDB.length > 0)
	{
		/*if(tagsFromDB[0].Flag === '0')
		{
		  Tags.update({_id: tagsFromDB[0]._id}, { $set: { Flag: '1'} }, function(err, response){
			console.log(response);
			socket.emit('cb', data);    
                 	console.log('wedwe', tagsFromDB[0].Flag, 'ett');

		})

//		 socket.emit('cb', data);    
  //         	 console.log('wedwe', tagsFromDB[0].Flag, 'ett');

		}*/

		Tags.update({_id: tagsFromDB[0]._id}, { $set: { Flag: '1'} }, function(err, response){
                        console.log(response);
                        io.sockets.emit('cb', data);  
		});
			
	    //socket.emit('cb', data);	
	    //console.log('wedwe', tagsFromDB[0].Flag, 'ett');
	}
});

    //socket.emit('cb', data);
    socket.emit('cb1', 'mongoose is there');
    socket.emit('sockets', list);
  })
});
