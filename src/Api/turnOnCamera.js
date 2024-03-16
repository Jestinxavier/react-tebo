export const turnOnCamera = (id, email) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        //   facingMode: isFront ? "user" : "environment",
        // optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    })
    .then((stream) => {
      // Got stream!
      // console.log(stream.getTracks(), "Got stream!");

      setlocalStream(stream);

      stream.getTracks().map((track) => {
        peerConnection.current.addTrack(track, stream);
      });
    })
    .catch((error) => {
      // Log error
    });
};
