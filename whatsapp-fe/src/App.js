import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  // for fetching initial information
  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  }, []);

  // alert when a message is inserted
  useEffect(() => {
    const pusher = new Pusher("447ac9a1d3bfa749aae4", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="appBody">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
