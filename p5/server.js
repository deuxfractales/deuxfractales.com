var express = require('express');
var socket = require('socket.io')

var app = express();
var server = app.listen(3000)

app.use(express.static('public'))

var io = socket(server)

io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log('new connection ' + socket.id)
    socket.on('shape', shapeMsg)

    function shapeMsg(data){
        socket.broadcast.emit('shape', data)
        // console.log(data)
    }

}