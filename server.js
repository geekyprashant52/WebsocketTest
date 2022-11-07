'use strict';

const helmet = require("helmet");

const INDEX = '/index.html';
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();
const PORT = process.env.PORT || 8282;

app.use(express());
app.use((req, res) => res.sendFile(INDEX, { root: __dirname }));
server.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//EVENT LISTENERS


io.on("connection", (socket) => {
  
    console.log("User Connected");

    let data = { id: socket.id };
    socket.emit("set_id", data);
 
    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);