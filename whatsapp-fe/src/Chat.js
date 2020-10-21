import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import "./Chat.css";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "DEMO APP",
      timestamp: "Just now",
      received: false,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chatHeader">
        <Avatar />

        <div className="chatHeaderInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chatHeaderRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chatBody">
        {messages.map((message) => (
          <p className={`chatMessage ${message.received && "chatReceiver"}`}>
            <span className="chatName">{message.name}</span>
            {message.message}
            <span className="chatTimestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chatFooter">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
