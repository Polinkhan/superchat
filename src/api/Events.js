import React, { useEffect } from "react";
import { useDataContext } from "../contexts/DataContext";
import { socket } from "./Client";

const Events = () => {
  const { setCurrentUser, setData, setGroupMessage } = useDataContext();

  useEffect(() => {
    const on_registration_complete = (data) => {
      localStorage.setItem("currentUser", JSON.stringify(data));
      socket.emit("join_me", data);
      setCurrentUser(data);
    };

    const on_new_grp_msg = (data) => {
      setGroupMessage((prev) => [...prev, { ...data }]);
    };

    const on_new_join = (Users, UserActivity) => {
      setData({ Users, UserActivity });
    };

    const on_current_data = (Users, UserActivity) => {
      setData({ Users, UserActivity });
    };

    socket.on("new_join", on_new_join);
    socket.on("new_grp_msg", on_new_grp_msg);
    socket.on("current_data", on_current_data);
    socket.on("registration_complete", on_registration_complete);

    return () => {
      socket.off("new_join", on_new_join);
      socket.off("new_grp_msg", on_new_grp_msg);
      socket.off("current_data", on_current_data);
      socket.off("registration_complete", on_registration_complete);
    };
  }, []);
};

export default Events;
