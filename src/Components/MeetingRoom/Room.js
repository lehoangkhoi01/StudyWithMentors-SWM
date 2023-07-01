import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const meeting = async (element) => {
    const appID = 1546307871;
    const serverSecret = "4b3c42dd29556ddc5581c8c57897fe14";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      "TestRoom",
      Date.now().toString(),
      "Le Hoang Khoi (K15)"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showPreJoinView: false,
      showTextChat: false,
      showAudioVideoSettingsButton: false,
      showLayoutButton: false,
      roomTimerDisplayed: true,
    });
  };

  return <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Room;
