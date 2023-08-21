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
    // Send message using ZegoCloud API
    // Replace this with actual code to send messages
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
