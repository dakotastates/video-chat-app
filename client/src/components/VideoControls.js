import React, {useState} from "react";

const VideoControls = (props) => {

  const [toggleMute, setToggleMute] = useState(false)
  const [toggleVideo, setToggleVideo] = useState(true)

  let mute;
  if(toggleMute){
    mute =
    <>
      <i className="fas fa-microphone"></i>
      <span>Mute</span>
    </>
  }else{
    mute =
    <>
      <i className="fas fa-microphone-slash"></i>
      <span>Unmute</span>
    </>
  }

  let video;
  if(toggleVideo){
    video =
    <>
      <i className="fas fa-video"></i>
      <span>Stop Video</span>
    </>
  }else{
    video =
    <>
      <i className="fas fa-video-slash"></i>
      <span>Start Video</span>
    </>
  }

  const handleMute = (e) =>{
    e.preventDefault();
    // setToggleMute(!toggleMute)
    const enabled = props.stream.getAudioTracks()[0].enabled;
    if(enabled){
      props.stream.getAudioTracks()[0].enabled = false;
      setToggleMute(false)
    }else{
      props.stream.getAudioTracks()[0].enabled = true;
      setToggleMute(true)
    }

  }

  const handleVideo = async(e) =>{
    e.preventDefault();
    const enabled = props.stream.getVideoTracks()[0].enabled;
    if(enabled){
      props.stream.getTracks().forEach(function(track) {
        track.stop();
      });
      props.stream.getVideoTracks()[0].enabled = false;
      setToggleVideo(false)
    }else{
      let newVideoStreamGrab = await navigator.mediaDevices.getUserMedia({
        video: true
      })
      props.stream.removeTrack(props.stream.getVideoTracks()[0])

      props.stream.addTrack(newVideoStreamGrab.getVideoTracks()[0])

      props.stream.getVideoTracks()[0].enabled = true;
      setToggleVideo(true)
    }

  }

  const endCall = () =>{
    props.stream.getTracks().forEach(function(track) {
      track.stop();
    });
    props.history.push(`/`);
  }


  return (
    <div className='controls-container'>
      <div className='controls-block'>
        <div className='control-button' onClick={handleMute}>
          {mute}
        </div>
        <div className='control-button' onClick={handleVideo}>
          {video}
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
        <div className='control-button leave' onClick={endCall}>
          <span>Leave</span>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
