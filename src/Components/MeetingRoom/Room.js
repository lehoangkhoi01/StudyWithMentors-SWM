import React, { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { CLASS_NAME } from "../../shared/constants/common";
import { bookingService } from "../../Services/bookingService";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../Store/slices/userSlice";
import { ROUTES } from "../../shared/constants/navigation";
import { SYSTEM_ROLE } from "../../shared/constants/systemType";

const PRIMARY_COLOR = "#383c6b";
const BACKGROUND_COLOR = "#202349";

const Room = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    const appContent = document.querySelectorAll(`#app_content`).item(0);
    const appHeader = document.querySelectorAll(`#app_header`).item(0);
    const appFooter = document.querySelectorAll(`#app_footer`).item(0);

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

        if (stopPresenting && stopPresenting.innerHTML)
          stopPresenting.innerHTML = stopPresenting.innerHTML.replace(
            "Stop Presenting",
            "Dừng chia sẻ"
          );

        const notFoundMedia = document
          .querySelectorAll(`.${CLASS_NAME.NOT_FOUND_MEDIA}`)
          .item(0);

        if (notFoundMedia && notFoundMedia.innerHTML)
          notFoundMedia.textContent = "Micro hoặc camera hiện đang tắt";

        // CONTENT ==========================================

        if (appContent && appContent.innerHTML)
          appContent.style.backgroundColor = BACKGROUND_COLOR;

        // HEADER ==========================================
        if (appHeader && appHeader.innerHTML) {
          appHeader.style.display = "none";
        }

        // FOOTER ==========================================
        if (appFooter && appFooter.innerHTML) {
          appFooter.style.display = "none";
        }

        // VIDEO ==========================================

        const background = document
          .querySelectorAll(`.${CLASS_NAME.BACKGROUND}`)
          .item(0);

        if (background && background.innerHTML)
          background.style.backgroundColor = BACKGROUND_COLOR;

        const video = document.querySelectorAll(`.${CLASS_NAME.VIDEO_1}`);

        if (video && video.length) {
          [...video].map(
            (item) => (item.style.backgroundColor = PRIMARY_COLOR)
          );
        }

        const videoBackground = document
          .querySelectorAll(`.${CLASS_NAME.VIDEO_BACKGROUND}`)
          .item(0);

        if (videoBackground && videoBackground.innerHTML)
          videoBackground.style.backgroundColor = PRIMARY_COLOR;

        const outsideVideo1 = document
          .querySelectorAll(`.${CLASS_NAME.OUTSIDE_VIDEO_1}`)
          .item(0);

        if (outsideVideo1)
          outsideVideo1.style.backgroundColor = BACKGROUND_COLOR;

        const outsideVideo2 = document
          .querySelectorAll(`.${CLASS_NAME.OUTSIDE_VIDEO_2}`)
          .item(0);

        if (outsideVideo2)
          outsideVideo2.style.backgroundColor = BACKGROUND_COLOR;

        // RIGHT SIDE Box ==========================================
        const rightSideBox = document
          .querySelectorAll(`.${CLASS_NAME.RIGHT_SIDE_BOX}`)
          .item(0);

        if (rightSideBox && rightSideBox.innerHTML)
          rightSideBox.style.backgroundColor = PRIMARY_COLOR;

        // FOOTER ==========================================
        const meetingFooter = document
          .querySelectorAll(`.${CLASS_NAME.MEETING_FOOTER}`)
          .item(0);

        if (meetingFooter && meetingFooter.innerHTML)
          meetingFooter.style.backgroundColor = BACKGROUND_COLOR;

        // ICON ==========================================
        const microIcon = document
          .querySelectorAll(`.${CLASS_NAME.MIRCO_ICON}`)
          .item(0);

        if (microIcon) microIcon.style.backgroundColor = PRIMARY_COLOR;

        const cameraIcon = document
          .querySelectorAll(`.${CLASS_NAME.CAMERA_ICON}`)
          .item(0);

        if (cameraIcon) cameraIcon.style.backgroundColor = PRIMARY_COLOR;

        const sharingIcon = document
          .querySelectorAll(`.${CLASS_NAME.SHARING_ICON}`)
          .item(0);

        if (sharingIcon) sharingIcon.style.backgroundColor = PRIMARY_COLOR;

        const roomDetailIcon = document
          .querySelectorAll(`.${CLASS_NAME.ROOM_DETAIL_ICON}`)
          .item(0);

        if (roomDetailIcon)
          roomDetailIcon.style.backgroundColor = PRIMARY_COLOR;

        const memberIcon = document
          .querySelectorAll(`.${CLASS_NAME.MEMBER_ICON}`)
          .item(0);

        if (memberIcon) memberIcon.style.backgroundColor = PRIMARY_COLOR;

        const chatIcon = document
          .querySelectorAll(`.${CLASS_NAME.CHAT_ICON}`)
          .item(0);

        if (chatIcon) chatIcon.style.backgroundColor = PRIMARY_COLOR;
        // LEAVE  ==========================================
        const leaveTitle = document
          .querySelectorAll(`.${CLASS_NAME.LEAVE_TITLE}`)
          .item(0);

        if (leaveTitle && leaveTitle.textContent)
          leaveTitle.textContent = "Rời khỏi phòng";

        const leaveConfirm = document
          .querySelectorAll(`.${CLASS_NAME.LEAVE_CONFIRM}`)
          .item(0);

        if (leaveConfirm && leaveConfirm.textContent)
          leaveConfirm.textContent = "Bạn có muốn rời khỏi phòng họp";

        const cancelLeave = document
          .querySelectorAll(`.${CLASS_NAME.CANCEL_LEAVE}`)
          .item(0);

        if (cancelLeave && cancelLeave.textContent)
          cancelLeave.textContent = "Hủy";

        const submitLeave = document
          .querySelectorAll(`.${CLASS_NAME.SUBMIT_LEAVE}`)
          .item(0);

        if (submitLeave && submitLeave.textContent)
          submitLeave.textContent = "Rời";

        const divChatPlaceholder = document
          .querySelectorAll(`.${CLASS_NAME.PLACE_HOLDER}`)
          .item(0);

        if (divChatPlaceholder) {
          const chatPlaceholder = divChatPlaceholder
            .getElementsByTagName("input")
            .item(0);

          if (chatPlaceholder)
            chatPlaceholder.placeholder = "Gửi tin nhắn đến mọi người";
        }

        const isLeft = document
          .querySelectorAll(`.${CLASS_NAME.IS_LEFT}`)
          .item(0);

        if (isLeft) isLeft.textContent = "Bạn đã rời khỏi phòng";
      } catch (error) {
        console.log(error);
      }
    }, 50);

    return () => {
      clearInterval(vietsub);

      if (appContent && appContent.innerHTML)
        appContent.style.backgroundColor = "unset";

      if (appHeader && appHeader.innerHTML) {
        appHeader.style.display = "unset";
      }

      if (appFooter && appFooter.innerHTML) {
        appFooter.style.display = "block";
      }
    };
  }, []);

  useEffect(() => {
    checkParticipant();
  }, []);

  const checkParticipant = async () => {
    try {
      if (!userInfo || !userInfo.accountId) {
        throw "error";
      }

      const bookingInfo = await bookingService.getBookingById(id);

      const participants = [bookingInfo.mentor, ...bookingInfo.mentees];

      const indexOfUser = participants
        .map((member) => member.accountId)
        .indexOf(userInfo.accountId);

      if (userInfo.role !== SYSTEM_ROLE.ADMIN && indexOfUser < 0) {
        throw "error";
      } else {
        const data = {
          ids: [userInfo.accountId],
        };
        try {
          await bookingService.logAttendance(id, data);
        } catch (error) {
          history.push(ROUTES.SERVER_ERROR);
        }
      }

      setIsChecked(true);
    } catch (error) {
      const appContent = document.querySelectorAll(`#app_content`).item(0);
      const appHeader = document.querySelectorAll(`#app_header`).item(0);
      const appFooter = document.querySelectorAll(`#app_footer`).item(0);

      if (appContent && appContent.innerHTML)
        appContent.style.backgroundColor = "unset";

      if (appHeader && appHeader.innerHTML) {
        appHeader.style.display = "unset";
      }

      if (appFooter && appFooter.innerHTML) {
        appFooter.style.display = "block";
      }

      history.push("/not-found");
    }
  };

  const meeting = async (element) => {
    const appID = 1546307871;
    const serverSecret = "4b3c42dd29556ddc5581c8c57897fe14";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      userInfo.accountId,
      userInfo.fullName
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showPreJoinView: false,
      showTextChat: true,
      showAudioVideoSettingsButton: false,
      showLayoutButton: false,
      roomTimerDisplayed: true,
      showRoomDetailsButton: false,
      onLeaveRoom: () => {
        window.open("about:blank", "_self");
        window.close();
      },
    });
  };

  return (
    <>{isChecked && <div ref={meeting} style={{ height: "85vh" }}></div>}</>
  );
};

export default Room;
