import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
// import './style.scss';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
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

// get token
// function generateToken(tokenServerUrl: string, userID: string) {
// Obtain the token interface provided by the App Server
// return fetch(
//   `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
//   {
//     method: 'GET',
//   }
// ).then((res) => res.json());

// }

async function generateToken(userID) {
  try {
    const response = await axios.post("http://localhost:5000/zego",{
      userID:userID
      
    });
    return response.data; // Return the data from the Axios response
  } catch (error) {
    console.error("Error fetching token:", error);
    return null; // Return null or handle the error as needed
  }
}

const userID = randomID(5);
const userName = "user_" + userID;
const serverSecret = "7362f313493120529b218c14387763d0"; // type: 32 byte length string



export default function App() {
  const [callees, setCallees] = useState("");
  const [zp, setZp] = useState(null);
  const mounted = async (el: HTMLDivElement) => {
    if (!el || zp) return;
    // generate token

    const { token } = await generateToken("ygygygyy", userID);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      1211278687,
      token,
      null,
      userID,
      userName
    );
    // create instance object from token
    const myZp = ZegoUIKitPrebuilt.create(kitToken);
    // add call invitation plugin
    myZp.addPlugins({ ZIM });
    myZp.setCallInvitationConfig({
      enableNotifyWhenAppRunningInBackgroundOrQuit: true,
    });
    setZp(myZp);
  };

  const handleSendCallInvitation = (callType: number) => {
    const values = callees.split(",");
    const invitees = values
      .filter((v) => v.length)
      .map((v) => ({
        userID: v,
        userName: "user_" + v,
      }));
    zp.sendCallInvitation({
      callees: invitees,
      callType: callType,
      timeout: 60,
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
      style={{ width: "100vw", height: "100vh" }}
      ref={mounted}
    >
      <div className="callInvitationWrapper">
        <div className="invitationModel">
          <div className="invitationUserHeader">
            <div className="invitationAvatar">{userName.slice(0, 1)}</div>
            <div className="invitationUserInf">
              <p>userName: {userName}</p>
              <span>userID: {userID}</span>
            </div>
          </div>
          <p className="invitationTitle">Make a direct call</p>
          <input
            className="invitationInput"
            type="text"
            placeholder={'Enter callees\' user id, separate them by ","'}
            value={callees}
            required
            onInput={(e: any) => {
              setCallees(e.target.value);
            }}
            onChange={(e: any) => {
              setCallees(e.target.value);
            }}
          />
          <div
            className="invitationVideoCallBtn"
            onClick={() => {
              handleSendCallInvitation(1);
            }}
          >
            Video call
          </div>
          <div
            className="invitationVoiceCallBtn"
            onClick={() => {
              handleSendCallInvitation(0);
            }}
          >
            Voice call
          </div>
        </div>
      </div>
    </div>
  );
}
