import React from "react";

const VideoControls = (props) => {


  return (
    <div className='controls-container'>
      <div className='controls-block'>
        <div className='control-button'>
          <i className="fas fa-microphone"></i>
          <span>Mute</span>
        </div>
        <div className='control-button'>
          <i className="fas fa-video"></i>
          <span>Video</span>
        </div>
      </div>
      <div className='controls-block'>
        <div className='control-button' onClick={()=>props.setToggleParticipants(!props.toggleParticipants)}>
          <i className="fas fa-user-friends"></i>
          <span>Participants</span>
        </div>
        <div className='control-button' onClick={()=>props.setToggleChat(!props.toggleChat)}>
          <i className="fas fa-comments"></i>
          <span>Chat</span>
        </div>
      </div>
      <div className='controls-block'>
        <div className='control-button leave'>
          <span>Leave</span>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
