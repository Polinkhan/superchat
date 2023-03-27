// express
const express = require("express");
const app = express();

// packages
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

// app config
var cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// module scaffolding
const auth = require("./routes/auth.route");

// routes
app.use("/auth", auth);

// error handled
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

// listening app
server.listen(8000, () => {
  console.log("listening on port 8000");
});

const Users = {};
const UserActivity = { totalActive: 0 };
const SocketPair = {};

io.on("connection", (socket) => {
  socket.on("register_me", (name) => {
    Users[socket.id] = name;
    UserActivity[socket.id] = { isOnline: true };
    socket.emit("registration_complete", { name, id: socket.id });
  });

  socket.on("join_me", (data) => {
    SocketPair[socket.id] = data.id;
    Users[data.id] = data.name;
    UserActivity[data.id] = { isOnline: true };
    socket.emit("current_data", Users, UserActivity);
    socket.broadcast.emit("new_join", Users, UserActivity);
  });

  socket.on("logout", (data) => {
    SocketPair[socket.id] = data.id;
    Users[data.id] = data.name;
    UserActivity[data.id] = {
      isOnline: false,
      left: new Date().getTime(),
    };
    socket.broadcast.emit("current_data", Users, UserActivity);
  });

  socket.on("send_grp_msg", (data) => {
    socket.emit("new_grp_msg", data);
    socket.broadcast.emit("new_grp_msg", data);
  });
  //   socket.on("new-user-joined", (name) => {
  //     Users[socket.id] = name;
  //     const newUser = { [socket.id]: name };
  //     socket.broadcast.emit("user-joined", newUser, socket.id);
  //     console.log(Users);
  //   });

  //   socket.on("requstUsersData", () => {
  //     console.log(Users);
  //     socket.emit("getUsersData", Users, socket.id, groupMassages);
  //   });

  //   socket.on("send", (massege) => {
  //     groupMassages.push({ name: Users[socket.id], id: socket.id, msg: massege });
  //     socket.broadcast.emit("receive", groupMassages);
  //   });

  //   socket.on("privateMsg", (id, massege) => {
  //     const msg = { name: Users[socket.id], id: socket.id, msg: massege };
  //     socket.to(id).emit("privateMsgRec", msg, socket.id);
  //   });

  //   socket.on("clearMsg", () => {
  //     groupMassages = [];
  //     socket.broadcast.emit("receive", groupMassages);
  //     socket.emit("receive", groupMassages);
  //   });

  socket.on("disconnect", () => {
    if (UserActivity[SocketPair[socket.id]]) {
      UserActivity[SocketPair[socket.id]] = {
        isOnline: false,
        left: new Date().toLocaleTimeString(),
      };
      socket.broadcast.emit("current_data", Users, UserActivity);
    }
    console.log(Users, "left", socket.id);
  });
});
