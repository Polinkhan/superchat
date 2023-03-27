import React, { useEffect } from "react";
import { useDataContext } from "../contexts/DataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootTab from "../tabs/RootTab";
import PrivateRoute from "./PrivateRoute";
import GroupChatTab from "../tabs/GroupChatTab";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import PrivateChatTab from "../tabs/PrivateChatTab";
import RoomChatTab from "../tabs/RoomChatTab";
import ChatBoxPage from "../pages/ChatBoxPage";
import { socket } from "../api/Client";

const RootRouter = () => {
  const { currentUser, setCurrentUser, setData, Data } = useDataContext();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user && socket.emit("join_me", user);
    user && setCurrentUser(user);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<RootTab />}>
            <Route path="/groupchat" element={<GroupChatTab />}>
              <Route path="/groupchat/:id" element={<ChatBoxPage />} />
            </Route>
            <Route path="/privatechat" element={<PrivateChatTab />}>
              <Route path="/privatechat/:id" element={<ChatBoxPage />} />
            </Route>
            <Route path="/roomchat" element={<RoomChatTab />}>
              <Route path="/roomchat/:id" element={<ChatBoxPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;
