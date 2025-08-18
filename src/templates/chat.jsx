import React, { useState, useEffect } from "react";
import '../css/chat.css';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setSocket(ws);

    ws.onopen = () => console.log("✅ WebSocket conectado.");
    ws.onerror = (err) => console.error("❌ Erro WebSocket:", err);
    ws.onclose = () => console.warn("⚠️ WebSocket desconectado.");
    ws.onmessage = (event) => {
      console.log("🧠 Resposta do bot:", event.data);
      setChat((prevChat) => [...prevChat, "Pluma: " + event.data]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      console.log("📤 Enviando:", message);
      socket.send(message);
      setChat((prevChat) => [...prevChat, "Você: " + message]);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Pluma Web</h2>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className="chat-message">{msg}</div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
