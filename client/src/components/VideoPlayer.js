import React from "react";

const VideoPlayer = (props) => {


  return (
    <div className='video-container'>
      <div className='video-player'>
        <video playsInline ref={props.userVideo} autoPlay />
      </div>
    </div>
  );
};

export default VideoPlayer;
