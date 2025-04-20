import React, { useState } from "react";
import axios from "axios";
import { FaComments } from "react-icons/fa";
import "./Chatbot.css";

const API_KEY = "AIzaSyDFaEuBxGS7ZfIpqvcEag2Kv2xeLq79k5A";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: input }] }],
        }
      );

      const botMessage = {
        role: "bot",
        content:
          response.data.candidates[0]?.content?.parts[0]?.text || "No response",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h3>AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
                <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br>') }}></span>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-btn" onClick={() => setIsOpen(true)}>
          <FaComments size={28} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
