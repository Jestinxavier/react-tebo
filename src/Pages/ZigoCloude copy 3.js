import React, { useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import axios from 'axios';

function ZigoCloude() {
  const [useTocken, setUseTocken] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.post('http://localhost:5000/zego').then((res) => {

    console.log(res.data.token,"res.data");  
      setUseTocken(res.data.token);
      setLoading(false); // Set loading to false when the token is fetched
    });
  }, []);

  useEffect(() => {
    async function init() {
      if (useTocken) {
        const userID = 46545;
        const userName = 'user_' + userID;

        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1211278687,
          useTocken,
          null,
          userID,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(KitToken);
        zp.addPlugins({ ZIM });

        // Your initialization code
        document.querySelector('.name').innerHTML = userName;
        document.querySelector('.id').innerHTML = userID;
        
        console.log(userID);
        
      }
    }

    init();
  }, [useTocken]);

  function handleSend(callType) {
    // Your handleSend function
  }

  function randomID(len) {
    // Your randomID function
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="name"></h1>
      <h2 className="id"></h2>
      <button className="videoCall" onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall, '46544')}>
        Video Call
      </button>
      <button className="voiceCall" onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall, '46544')}>
        Voice Call
      </button>
    </div>
  );
}

export default ZigoCloude;
