import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { MessageSharp, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import axios from "axios";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();

  // const [rooms, setRooms] = useState([]);
  // useEffect((async) => {
  //   axios.get("/rooms").then((res) => {
  //     setRooms(res.data);
  //     console.log(res.data);
  //   });
  // }, []);

  // useEffect(async () => {
  //   await axios
  //     .get("/rooms")
  //     .then((res) => {
  //       setRooms(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);


  /////

  const [rooms, setRooms] = useState([]);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    getConnectedRooms();
  }, []);

  const getConnectedRooms = () => {
    axios
      .get("http://localhost:9000/rooms")
      .then((res) => {
        setRooms(res.data.data);
        console.log("Data has been received", res.data.data);
      })
      .catch(() => {
        alert("Data got issues");
      });
  };

  console.log("room data: ", rooms);

  // const grabMessages = () => {
  //   var msgObj = [];
  //   var msgObj2 = [];
  //   for (let i = 0; i < rooms.length; i++) {
      // console.log('message obj here >>', rooms[i].messages);
      // msgObj.push(rooms[i].messages);
      // console.log('msgObj', msgObj);

      // for (let j = msgObj.length-1; j >= msgObj.length-1; j--) {
      //   lastMsg.push(msgObj[i][j]);
      //   console.log('msgObj2 >>> ', lastMsg);
      //   for (let k = msgObj.length-1; k >= msgObj.length-1; k--) {
      //     console.log('msgObj msgs >>', msgObj[j][k].message);
      //   }
      // }
      //
      //
      //
      // for (let j = msgObj.length; j > msgObj.length-1; j--) {
      //   console.log('this is the last msg', msg[j].message);
      // }
      // msgObj.forEach(function )
      //
      //
    // }
  // }

  /////

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
        {rooms.map((room) => (
          <SidebarChat name={room.name} />
        ))}

      </div>
    </div>
  );
}

export default Sidebar;
