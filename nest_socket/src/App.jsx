import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  // const socket = io("http://localhost:8834");
  const [messages, setMessages] = useState([]);

  const [socket, setSocket] = useState();
  const [typing, setTyping] = useState("");
  const handleSend = () => {
    socket.emit("createChat", message);
  };
  socket?.on("res_message", (data) => {
    console.log(data);
    setTyping("");
    setMessages([...messages, data]);
  });
  socket?.on("connection", (con) => {
    console.log(con);
  });
  socket?.on("typing", (typers) => {
    setTyping("someone is typing");
  });
  useEffect(() => {
    setSocket(io("http://localhost:8834"));
  }, [setSocket]);
  return (
    <div>
      sdf
      <input
        type="text"
        placeholder="Enter message"
        onChange={(e) => {
          setMessage(e.target.value);
          setTyping(true);
          socket.emit("typing", "someone is typing");
        }}
      />
      <button onClick={() => handleSend()}> Send</button>
      <div className="">
        {messages.map((message, index) => {
          return <p key={index}>{message}</p>;
        })}
      </div>
      <div className="">{typing !== "" && <p>Someone is typing</p>}</div>
    </div>
  );
};

export default App;
