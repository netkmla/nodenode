var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var bodyParser = require('body-parser');

var querystring = require('querystring');
var title;

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',function(req, res){
  res.sendFile(__dirname + '/client.html');
});

app.post('https://kmlakmla.herokuapp.com',function(req,res){

  console.log("id :", req.body.id);
})


var count=1;
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  // var name = "user" + count++;
  var name = title;
  io.to(socket.id).emit('change name',name);

  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen(port, function(){
  console.log('server on!');
});
