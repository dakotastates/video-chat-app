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
