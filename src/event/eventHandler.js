import { useClientContext } from "../contexts/ClientContext";
import { useSocketContext } from "../contexts/SocketContext";
import { useEffect } from "react";

function EventHandler() {
  const { socket } = useSocketContext();
  const { setUsers, myId, setMyId, massages, setMassages } = useClientContext();

  //===initially request for all active users===//
  useEffect(() => {
    socket.emit("requstUserData");
  }, []); //eslint-disable-line

  useEffect(() => {
    //===initially fetch all active user===//
    socket.on("getUser", (userList, myId, msgs) => {
      const ids = Object.keys(userList);
      const allMsgs = {};
      for (let i = 0; i < ids.length; i++) {
        ids[i] === "group" ? (allMsgs[ids[i]] = msgs) : (allMsgs[ids[i]] = []);
      }
      setMassages(allMsgs);
      setUsers(userList);
      setMyId(myId);
    });

    //===adding newly joined users===//
    socket.on("user-joined", (newUser, msgs, id) => {
      if (myId) {
        if (newUser[myId]) {
          delete newUser[myId];
          setUsers(newUser);
          const allMsgs = massages;
          allMsgs[id] = [];
          setMassages(allMsgs);
        } else {
          setUsers(newUser);
          const allMsgs = massages;
          allMsgs[id] = [];
          setMassages(allMsgs);
        }
      }
    });

    //===updating users after someone leave===//
    socket.on("updateUser", (newUser, msgs) => {
      if (myId) {
        if (newUser[myId]) {
          delete newUser[myId];
          setUsers(newUser);
          // setGrpMsg(msgs);
        } else {
          setUsers(newUser);
          // setGrpMsg(msgs);
        }
      }
    });

    //===receive users message===//
    socket.on("receive", (msg) => {
      if (Object.keys(massages).length) {
        console.log("grp");
        const allMsgs = { ...massages };
        allMsgs.group = msg;
        setMassages(allMsgs);
      }
    });

    //===receive users private message===//
    socket.on("privateMsgRec", (name, id, msg) => {
      if (Object.keys(massages).length) {
        const allMsgs = { ...massages };
        allMsgs[id].push({ name: name, msg: msg });
        setMassages(allMsgs);
      }
    });
    return () => {
      socket.off();
    };
  }, [massages]); //eslint-disable-line
}

export default EventHandler;
