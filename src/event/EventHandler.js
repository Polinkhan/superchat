import { useClientContext } from "../contexts/ClientContext";
import { useSocketContext } from "../contexts/SocketContext";
import { useEffect } from "react";

function EventHandler() {
  const { socket } = useSocketContext();
  const { users, setUsers, setMyId, massages, setMassages } =
    useClientContext();

  //===initially request for all active users===//
  useEffect(() => {
    socket.emit("requstUsersData");
  }, []); //eslint-disable-line

  useEffect(() => {
    //===initially fetch all active user===//
    socket.on("getUsersData", (Users, myId, groupMsg) => {
      const allMsgs = {};
      const userList = Object.keys(Users);
      userList.forEach((list) => {
        list === "group" ? (allMsgs[list] = groupMsg) : (allMsgs[list] = []);
      });

      setMassages(allMsgs);
      setUsers(Users);
      setMyId(myId);
    });

    //===adding newly joined users===//
    socket.on("user-joined", (newUser, userId) => {
      setUsers({ ...users, ...newUser });
      setMassages({ ...massages, [userId]: [] });
    });

    //===updating users after someone leave===//
    socket.on("updateUser", (userId) => {
      const copyUsers = { ...users };
      delete copyUsers[userId];
      setUsers(copyUsers);
    });

    //===receive users message===//
    socket.on("receive", (msg) => {
      setMassages({ ...massages, group: msg });
    });

    //===receive users private message===//
    socket.on("privateMsgRec", (msg, userId) => {
      console.log(msg);
      setMassages({ ...massages, [userId]: [...massages[userId], msg] });
    });
    return () => {
      socket.off("getUsersData");
      socket.off("user-joined");
      socket.off("updateUser");
      socket.off("receive");
      socket.off("privateMsgRec");
    };
  }, [users, massages]); //eslint-disable-line
}

export default EventHandler;
