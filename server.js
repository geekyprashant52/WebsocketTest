'use strict';

const helmet = require("helmet");
const cors = require("cors");

const INDEX = '/index.html';
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io", {
  allowEIO3: true,
  forceNew: true,
  transports: ["polling", "websocket"],
  secure: true,
})(server, {cors: {
  origin: "https://cognizantcom-5e5-dev-ed.develop.lightning.force.com",
  preflightContinue: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
}});
require("dotenv").config();
const PORT = process.env.PORT || 8282;

// app.use(cors({credentials: true, 
//   origin: 'https://cognizantcom-5e5-dev-ed.develop.lightning.force.com'}));
app.use(
    cors({
      origin: 'https://cognizantcom-5e5-dev-ed.develop.lightning.force.com',
      preflightContinue: true,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    })
  );
app.use(express());
app.use((req, res) => {
    res.header("Access-Control-Allow-Credentials", true);
    //res.sendFile(INDEX, { root: __dirname })
    res.send("connection successfully established")
  }
);
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