import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import axios from 'axios'

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// function invite() {
//    const targetUser = {
//         userID:'',
//         userName:''
//     };
//    zp.sendCallInvitation({
//     callees: [targetUser],
//     callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
//     timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
//    }).then((res) => {
//     console.warn(res);
//    })
//    .catch((err) => {
//    console.warn(err);
//    });
// }
export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function ZigoCloude() {
  useEffect(() => {
    axios.post('http://localhost:5000/zego').then
  
    return () => {
      second
    }
  }, [third])
  
 

  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1211278687;
    const serverSecret = "7362f313493120529b218c14387763d0";


    // const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    //   appID,
    //   serverSecret,
    //   roomID,
    //   randomID(5),
    //   randomID(5)
    // );

    // Create instance object from Kit Token.
    // const zp = ZegoUIKitPrebuilt.create(kitToken);

    // start the call
    // zp.joinRoom({
    //   container: element,
    //   sharedLinks: [
    //     {
    //       name: 'Personal link',
    //       url:
    //        window.location.protocol + '//' +
    //        window.location.host + window.location.pathname +
    //         '?roomID=' +
    //         roomID,
    //     },
    //   ],
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.InvitationTypeVideoCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
    //   },
    // });

    const userID = "6676";
    const userName = "jestin" + userID;
    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    const targetUser = {
      userID: "46544",
      userName: "jes",
    };
    zp.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
    })
      .then((res) => {
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
