import React, { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { CLASS_NAME } from "../../shared/constants/common";

const Room = () => {
  useEffect(() => {
    const vietsub = setInterval(() => {
      try {
        const sharingWarning = document
          .querySelectorAll(`.${CLASS_NAME.P_SHARING_WARNING} p`)
          .item(0);

        if (sharingWarning)
          sharingWarning.textContent =
            "Để tránh gương vô cực, chúng tôi khuyên bạn không nên chia sẻ toàn bộ màn hình hoặc cửa sổ trình duyệt của mình.";

        const ignoreSharingWarning = document
          .querySelectorAll(`.${CLASS_NAME.DIV_IGNORE_SHARING_WARNING} div`)
          .item(0);

        if (ignoreSharingWarning) ignoreSharingWarning.textContent = "Bỏ qua";

        const youArePresenting = document
          .querySelectorAll(`.${CLASS_NAME.P_YOU_ARE_PRESENTING} p`)
          .item(0);

        if (youArePresenting)
          youArePresenting.textContent = "Bạn đang chia sẻ màn hình";

        const captionIsYou = document
          .querySelectorAll(`.${CLASS_NAME.SPAN_CAPTION_IS_YOU}`)
          .item(0);

        if (captionIsYou && captionIsYou.textContent)
          captionIsYou.textContent = "(Bạn)";

        const captionIsYouInRoomMembers = document
          .querySelectorAll(`.${CLASS_NAME.DIV_CAPTION_IS_YOU_ROOM_MEMBERS_1}`)
          .item(0);

        if (captionIsYouInRoomMembers && captionIsYouInRoomMembers.innerHTML)
          captionIsYouInRoomMembers.innerHTML =
            captionIsYouInRoomMembers.innerHTML.replace("You", "Bạn");

        const stopPresenting = document
          .querySelectorAll(`.${CLASS_NAME.DIV_STOP_PRESENTING}`)
          .item(0);

        if (stopPresenting.innerHTML)
        stopPresenting.innerHTML =
        stopPresenting.innerHTML.replace("Stop Presenting", "Dừng chia sẻ");
      } catch (error) {
        console.log(error);
      }
    }, 100);

    return () => clearInterval(vietsub);
  }, []);

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

  return <div ref={meeting} style={{ height: "85vh" }}></div>;
};

export default Room;
