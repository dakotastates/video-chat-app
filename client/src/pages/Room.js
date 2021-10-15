import React, { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {

  const socketRef = useRef();
  const roomID = props.match.params.roomID;

  useEffect(()=>{
      socketRef.current = io('http://localhost:4000');

      navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
        audio: true
      })
      .then((stream) =>{
        socketRef.current.emit("join-room", roomID);

      }).catch(error => console.log(error))



    }, []);


  return (
    <div>
      Room
    </div>
  );
};

export default Room;
