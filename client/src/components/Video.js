import React, {useRef, useEffect} from "react";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
        ref.current.srcObject = stream;
    })
}, []);
  return (
    <div className='remote-video' >
      <video playsInline autoPlay ref={ref} />
    </div>
  );
};

export default Video;





// <div className='remote-video'>
//   Remote Video 2
// </div>
//
// <div className='remote-video'>
//   Remote Video 3
// </div>
