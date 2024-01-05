import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");
  // const socket = io("http://localhost:8834");
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("jaames");

  const [socket, setSocket] = useState();
  const [typing, setTyping] = useState("");

  const handleJoin = () => {
    socket?.emit("joinRoom", "thisisId");
    URLSearchParams.append("roomId", "thisisId");
  };
  socket?.on("joinedRoom", (data) => {
    console.log(data);
  });
  const handleSend = () => {
    socket.emit("createChat", { message, sender });
  };
  socket?.on("res_message", (data) => {
    console.log(data);
    setTyping("");
    setMessages([...messages, data]);
  });
  // socket?.on("connection", (con) => {
  //   console.log(con);
  // });
  // socket?.on("typing", (typers) => {
  //   setTyping("someone is typing");
  // });
  useEffect(() => {
    setSocket(io("http://localhost:8834"));
  }, [setSocket]);
  return (
    <div>
      <input
        type="text"
        placeholder="Enter message"
        onChange={(e) => {
          setMessage(e.target.value);
          // setTyping(true);
          // socket.emit("typing", "someone is typing");
        }}
      />
      <button onClick={() => handleSend()}> Send</button>
      <button onClick={() => handleJoin()}> Join</button>
      <div className="">
        {messages.map((message, index) => {
          return (
            <div className="" key={index}>
              <p>from {message.sender}</p>
              <p>{message.message}</p>;
            </div>
          );
        })}
      </div>
      <input
        type="text"
        onChange={(e) => {
          setSender(e.target.value);
        }}
      />
      <div className="">{typing !== "" && <p>Someone is typing</p>}</div>
    </div>
  );
};

export default App;
