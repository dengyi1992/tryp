var express = require('express'),
	app = express();
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
var nicknames = {};
var clients = [];
var num=0;
var clientsrecord = [];
server.listen(3000);
app.get('/',function(req,res){
	res.sendfile(__dirname +'/index.html');
});

io.sockets.on('connection',function(socket){
	socket.on('send message',function(data){
		// io.sockets.emit('new message',
		// 	data);
		socket.broadcast.emit('new message', {
	      username: "dy",
	      messagetitle: data.messaget,
	      messagecontent: data.messagec,
	      message: data.messaget,	
	      promotionlink: data.promotionl
	    });
	});
	socket.on('add user',function(data){
		// sava devicesId;
		nicknames[socket.id]=data;
		console.log(data);
		console.log(socket.id);
		clients[num]=socket;
		clientsrecord[num]=data;
		num++;

	});
	socket.on('private message',function(data){
		// console.log(data.pmto);
		// console.log(clients[0].id);

		clients[clientsrecord.lastIndexOf(data.pmto)].emit('private message', {
	      username: "dy",
	      messagetitle: data.messaget,
	      messagecontent: data.messagec,
	      message: data.messaget,	
	      promotionlink: data.promotionl
	  });
	});
});