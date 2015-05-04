/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var streams = require('./server/streams.js')();

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', 2013);
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// routing
require('./server/routes.js')(app, streams);

/**
 * Socket.io event handling
 */
require('./server/socketHandler.js')(io, streams);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});