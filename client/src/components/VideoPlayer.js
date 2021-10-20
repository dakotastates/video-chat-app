import React, { useEffect, useRef} from "react";

import Video from './Video';


const VideoPlayer = (props) => {


  return (
    <div className='video-container'>

      <div className='my-video'>
        <video muted playsInline ref={props.userVideo} autoPlay />
      </div>

      {props.peers.map((peer) => {
          return (
           <Video key={peer.peerID} peer={peer.peer} />
          );
        })
      }
    </div>

  );
};

export default VideoPlayer;


// <div className='video-container'>
//   <video className='my-video' muted playsInline ref={props.userVideo} autoPlay />
//
//     {props.peers.map((peer, index) => {
//         return (
//          <Video key={index} peer={peer} />
//         );
//      })
//     }
//
// </div>
