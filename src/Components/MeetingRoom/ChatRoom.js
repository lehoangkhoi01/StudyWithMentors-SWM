import React, { useState } from "react";

const ChatRoom = ({ messages, onSendMessage }) => {
  const [messageInput, setMessageInput] = useState("");

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      onSendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
