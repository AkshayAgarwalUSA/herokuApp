var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost', { useMongoClient: true });



mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
})

var db = mongoose.connection;

var schema = new mongoose.Schema({ name: 'string'});
var Tank = mongoose.model('Tank', schema);

var big = new Tank({ size: 'big' });

Tank.create({size: 'big'}, function (err, server) {
  if (err) return handleError(err);
  // saved!
  console.log(server);
})

Tank.find({size: 'big'}, function (err, server) {
  if (err) return handleError(err);
  // saved!
  console.log(server);
})


