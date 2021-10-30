import React, { useEffect, useRef, useState} from "react";

import Video from './Video';


const VideoPlayer = (props) => {

  return (
    <div className='video-container'>
          <div className={props.peers.length === 0 ? 'my-video' : 'remote-video'}>
            {true ? <video className='video' muted playsInline ref={props.userVideo} autoPlay /> : null}

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




      // <div className='my-video'>
      //   <video muted playsInline ref={props.userVideo} autoPlay />
      // </div>
      //
      // {props.peers.map((peer) => {
      //     return (
      //      <Video key={peer.peerID} peer={peer.peer} />
      //     );
      //   })
      // }


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



// <div className='remote-video'>Remote Video 1</div>
// <div className='remote-video'>Remote Video 2</div>
// <div className='remote-video'>Remote Video 3</div>
