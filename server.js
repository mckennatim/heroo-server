#!/usr/bin/env node
var http = require('http')
var app = require('./app');
var cfg = require('./cfg').cfg();


app.set('port', process.env.PORT || cfg.port);
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + server.address().port);
});

require('./modules/io/sio')(io);


