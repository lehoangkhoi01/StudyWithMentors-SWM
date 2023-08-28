import React, { useState, useEffect } from "react";
import ZegoClient from "your-zego-sdk-import"; // Replace with actual Zego SDK import
import ChatRoom from "./ChatRoom.js"; // Create a separate ChatRoom component

const VideoCall = () => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    // Initialize ZegoClient and setup event listeners
    const zegoClient = new ZegoClient();

    // Setup video stream
    const localVideo = document.getElementById("localVideo"); // HTML video element
    zegoClient.startLocalPreview(localVideo);

    // Setup screen sharing
    if (isScreenSharing) {
      zegoClient.startScreenSharing(); // Replace with actual screen sharing method
    }

    // Setup video call listeners
    zegoClient.onRemoteVideoAdd((streamID) => {
      const remoteVideo = document.createElement("video");
      remoteVideo.autoplay = true;
      remoteVideo.muted = false;
      remoteVideo.srcObject = zegoClient.getRemoteStream(streamID);
      document.getElementById("remoteVideoContainer").appendChild(remoteVideo);
    });

    zegoClient.onMessageReceived((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up
    return () => {
      zegoClient.stopLocalPreview();
      zegoClient.stopScreenSharing();
      zegoClient.logout();
    };
  }, [isScreenSharing]);

  const handleSendMessage = (message) => {
    const zegoClient = new ZegoClient(); // Initialize ZegoClient instance

    // Assuming there's a method in the ZegoCloud API to send messages
    zegoClient
      .sendMessage(message)
      .then(() => {
        // Successfully sent the message
        const formattedMessage = `You: ${message}`;
        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div>
      <div id="localVideoContainer">
        <video id="localVideo" />
      </div>
      <div id="remoteVideoContainer" />
      <button onClick={() => setIsScreenSharing(!isScreenSharing)}>
        {isScreenSharing ? "Stop Screen Sharing" : "Start Screen Sharing"}
      </button>
      <ChatRoom messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default VideoCall;
