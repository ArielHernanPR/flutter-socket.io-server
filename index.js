const { Socket } = require("dgram");
const express = require("express");
const path = require("path");
require("dotenv").config();

//App de express
const app = express();

//Node Server
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Mensajes de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");
    client.on('disconnect', () => { console.log("Cliente desconectado") });

  client.on("mensaje",(payload)=> {
    console.log("mensaje",payload);

    io.emit("mensaje", {admin:"Nuevo Mensaje"});

    

  });


});

//Path publico
const publicPath = path.resolve(__dirname,"public" );
app.use(express.static(publicPath));

server.listen(process.env.PORT, ( error ) => {

    if( error ) throw new Error(error);

    console.log("Servidor corriendo en puerto:", process.env.PORT);

});