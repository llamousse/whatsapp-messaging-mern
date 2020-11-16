import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import axios from "axios";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();

  const [rooms, setRooms] = useState([]);
  useEffect((async) => {
    axios.get("/rooms").then((res) => {
      setRooms(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <Avatar src={user?.photoURL} />
        <div className="sidebarHeaderRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebarSearch">
        <div className="sidebarSearchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebarChats">
        <SidebarChat addNewChat />
        <SidebarChat />
{/* 
        {rooms.map((room) => (
          <SidebarChat key={room.id} name={room.data.name} />
        ))} */}
      </div>
    </div>
  );
}

export default Sidebar;
