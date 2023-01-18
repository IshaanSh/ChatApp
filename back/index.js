const express = require("express"); // install kra express aur usko varialble mai rakh liya server bnanae ke liye
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http); // 3 parties ke liye use krenke liye
app.use(
  // middle ware har request pr work krta hai
  cors({
    origin: "http://localhost:4200/", //3 party library url ke liye
  })
);
app.get("/", (req, res, next) => {
  // middle ware isme 3 paremeter jaate hai
  res.send("Hello, This is the backend ");
});

let arrayOfClient = []; // jisme login ke time pr isme push ho jaae

let userName = "";

io.on("connection", (socket) => {
  //connection bnane ke liye socket ke saath
  io.emit("get socket id", socket.id); //

  socket.on("joinRoom", (data) => {
    // frontend mai catch krne ke liye string name same hona chahiye "join room"
    socket.join(data.roomName);
    console.log(data, "dara");
  });
  socket.on("ehlo", function (data) {
    // private user ke liye function
    console.log("data", data);
    userName = data;
    arrayOfClient.push({ socketId: socket.id, name: data });
    console.log("a user connected", arrayOfClient);
    io.emit("array", arrayOfClient);
  });
  socket.on("isUserAvailableData", (data) => {
    console.log(data, "isUserAvailablewe.......");
    isPresent = false;
    arrayOfClient.forEach((user) => {
      if (user.name == data.name) {
        isPresent = true;

      }
    });
    io.emit("isUserAvailableData", { isPresent: isPresent });
  });

  socket.on("message", (data) => {
    if (data.roomName) {
      io.in(data.roomName).emit("new message", data);
    } else {
      io.to(data.socketId).emit("new message", data);
      console.log("send to personal .....", data.socketId);
    }
    console.log("new msg send", data);
  });

  socket.on("disconnect", () => {
    console.log("user DIsconnected !!!");
    arrayOfClient = arrayOfClient.filter((item) => {
      // user discconect hone ke baad uske data hat jae
      return socket.id != item.socketId;
    });
    io.emit("array", arrayOfClient);
    console.log("a user disconnected!", arrayOfClient);
  });
});
http.listen(3000, () => {
  console.log("listening On *=4000");
});
