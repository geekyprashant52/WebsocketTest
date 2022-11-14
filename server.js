'use strict';

const helmet = require("helmet");
const cors = require("cors");

const INDEX = '/index.html';
const express = require("express");
const { time } = require("console");

const app = express();
const server = require("http").createServer(app);


const io = require("socket.io")(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});



require("dotenv").config();
const PORT = process.env.PORT || 8282;

let hostUrl = null;

// app.use(cors({credentials: true, 
//   origin: 'https://cognizantcom-5e5-dev-ed.develop.lightning.force.com'}));
app.use(cors());
app.use(express());
app.use((req, res) => {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    hostUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Methods' , ['GET', 'POST']);
    res.header('Access-Control-Allow-Headers' , ['Content-Type', 'X-Auth-Token', 'Origin' , 'Authorization']);

    res.sendFile(INDEX, { root: __dirname })
  }
);
server.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

//EVENT LISTENERS


io.on("connection", (socket) => {
  
    console.log("User Connected " + hostUrl);
    let data = { id: socket.id };
    socket.emit("set_id", data);
 
    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });

    
  
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);