import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import React from "react";
import "./Chat.css";

function Chat() {
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
        <p className="chatMessage">
          <span className="chatName">Vicky</span>
          This is a message
          <span className="chatTimestamp">{new Date().toUTCString()}</span>
        </p>

        <p className="chatMessage chatReceiver">
          <span className="chatName">Vicky</span>
          This is a message
          <span className="chatTimestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chatFooter">
        <InsertEmoticon />
        <form>
          <input
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button
            // onClick={sendMessage}
            type="submit"
          >
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
