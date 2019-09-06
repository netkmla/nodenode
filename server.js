var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 8000;

app.get('/',function(req, res){
  res.sendFile(__dirname + '/client.html');
});

var url = require('url');
var app = http.createServer(function(request,response){ 
  var _url = request.url; 
  var queryData = url.parse(_url,true).query;
  var title = queryData.id;
});


var count=1;
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  if(title == null)
  {
    var name = "user" + count++;
  }
  else
  {
    var name = title;
  }
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
