import React, { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import Peer from "simple-peer";


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);

  const socketRef = useRef();
  const peersRef = useRef([]);

  const roomID = props.match.params.roomID;

  useEffect(()=>{
      socketRef.current = io('http://localhost:4000');

      navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
        audio: true
      })
      .then((stream) =>{
        socketRef.current.emit("join-room", roomID);
        socketRef.current.on("all users", users => {
          const peers = [];
            users.forEach(userID => {
              const peer = createPeer(userID, socketRef.current.id, stream);
              peersRef.current.push({
                  peerID: userID,
                  peer,
              })
              peers.push(peer);
            })
            setPeers(peers);
        })

      }).catch(error => console.log(error))

    }, []);

  const createPeer = (userToSignal, callerID, stream) =>{
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending-signal", { userToSignal, callerID, signal })
    })

    return peer;
  }

  return (
    <div>
      Room
    </div>
  );
};

export default Room;
