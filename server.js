const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatCord Bot'

//Run when client connects
io.on('connection', socket =>{

    socket.on('joinRoom',({username, room})=>{
        

            //sends welcome message to individual client
    socket.emit('message',formatMessage(botName, 'Welcome to ChatCord!'));

    //Broadcast when a user connects, except to indiviual client
    socket.broadcast.emit('message',formatMessage(botName, 'A user has joined the chat'));


    })

    //listen for chatMessage
    socket.on('chatMessage', (msg) =>{
        io.emit('message', formatMessage('USER', msg))
    })


    //runs when client disconnects
    socket.on('disconnect', ()=>{
        io.emit('message',formatMessage(botName, 'A user has left the chat'))
    });

})

const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => console.log(`Server is running on ${PORT}`))