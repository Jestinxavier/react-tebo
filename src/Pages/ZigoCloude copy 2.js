import  React,{useEffect,useState} from "react";
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

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function ZigoCloude() {
  const [ZigoToken, setZigoToken] = useState()
  useEffect(() => {
    axios.post('http://localhost:5000/zego').then((res)=>{
      console.log('====================================');
      console.log(res.data);
      setZigoToken(res.data.token)
      console.log('====================================');

    })
  }, [])
  
 

  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1211278687;
    const serverSecret = "7362f313493120529b218c14387763d0";
    const userID = "6676";
    const userName = "jestin" + userID;

    const TOKEN = ZigoToken
    

    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp?.addPlugins({ ZIM });

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
