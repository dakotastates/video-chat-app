import React, { useEffect, useRef} from "react";

// import styled from "styled-components";
import Video from './Video';

// const Container = styled.div`
//     padding: 20px;
//     display: flex;
//     height: 100vh;
//     width: 90%;
//     margin: auto;
//     flex-wrap: wrap;
// `;

// const StyledVideo = styled.video`
//   height: 40%;
//   width: 50%;
// `;

// const Video = (props) => {
//   const ref = useRef();
//
//   useEffect(() => {
//       props.peer.on("stream", stream => {
//           ref.current.srcObject = stream;
//       })
//   }, []);
//
//   return (
//       <StyledVideo playsInline autoPlay ref={ref} />
//   );
// }

const VideoPlayer = (props) => {


  return (
    <div className='video-container'>

      <div className='my-video'>
        <video muted playsInline ref={props.userVideo} autoPlay />
      </div>

      {props.peers.map((peer, index) => {
          return (
           <Video key={index} peer={peer} />
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
