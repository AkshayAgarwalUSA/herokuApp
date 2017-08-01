var socket = io.connect('https://rocky-bayou-47977.herokuapp.com/')

var button = document.getElementById('button1');
var input = document.getElementById('input1');
var div = document.getElementById('div1');

button.addEventListener('click', function (){
  console.log('button clicked');
  socket.emit('app', {

    input: 'sadasdas'
  });
});

socket.on('cb', function(data){
  console.log('data is there');
  console.log(data);
})
