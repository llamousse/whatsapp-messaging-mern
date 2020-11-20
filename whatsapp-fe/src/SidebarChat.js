import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import axios from "axios";

function SidebarChat({ name, addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do db stuff
    }
  };

  /////
  // const [rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   getConnectedRooms();
  // }, []);

  // const getConnectedRooms = () => {
  //   axios
  //     .get("http://localhost:9000/rooms")
  //     .then((res) => {
  //       setRooms(res.data.data);
  //       console.log("Data has been received", res.data.data);
  //     })
  //     .catch(() => {
  //       alert("Data got issues");
  //     });
  // };

  // console.log("room data: ", rooms);

  // const displayConnectedRooms = (rooms) => {
  //   return rooms.map((room) => (
  //     <div className="sidebarChat">
  //     <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
  //     <div className="sidebarChatInfo">
  //       <h2>{room.name}</h2>
  //       {/* <p>This is the last message</p> */}
  //     </div>
  //   </div>
  //   ));
  // };
  /////

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
      <div className="sidebarChatInfo">
        <h2>{name}</h2>
        {/* <p>This is the last message</p> */}
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
