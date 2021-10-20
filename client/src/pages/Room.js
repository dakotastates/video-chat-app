import React, { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import Peer from "simple-peer";
import '../styles/Room.css';
import VideoControls from '../components/VideoControls'
import VideoPlayer from '../components/VideoPlayer'
import Chat from '../components/Chat'
import Participants from '../components/Participants'
import styled from "styled-components";
import { v1 as uuid } from "uuid";


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const [toggleChat, setToggleChat] = useState(false)
  const [toggleParticipants, setToggleParticipants] = useState(false)
  const [stream, setStream] = useState(null)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('Dakota')

  const socketRef = useRef();
  const peersRef = useRef([]);
  const userVideo = useRef();

  const roomID = props.match.params.roomID;

  const generateUsername = () =>{
    const id = uuid();
    const name = `user-${id}`
    setUsername(name)
  }

  useEffect(()=>{
      socketRef.current = io('http://localhost:4000');
      // generateUsername()

      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      .then((stream) =>{
        setStream(stream)
        userVideo.current.srcObject = stream;
        // RoomID to Socket
        socketRef.current.emit("join-room", roomID, username);
        // Find All Users
        socketRef.current.on("all users", users => {
          const peers = [];
            users.forEach(userID => {
              const peer = createPeer(userID, socketRef.current.id, stream);
              peersRef.current.push({
                  peerID: userID,
                  peer
              })
              peers.push({
                peerID : userID,
                peer
              });

            })
            setPeers(peers);
        })

        // Listen for New Peers

        socketRef.current.on("user joined", payload => {
          console.log('user joined', payload)
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
              peerID: payload.callerID,
              peer
          })

          const peerObj = {
            peer,
            peerID: payload.callerID
          }

          setPeers(users => [...users, peerObj]);
        });

        socketRef.current.on("receiving returned signal", payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);
          item.peer.signal(payload.signal);
          // item.peer.signal({signal: payload.signal, username: payload.username});
        });

        socketRef.current.on('user left', id => {
          const peerObj = peersRef.current.find(p => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter(p => p.peerId !== id);
          peersRef.current = peers;
          setPeers(peers);
        })

      }).catch(error => console.log(error))

    }, []);

  const createPeer = (userToSignal, callerID, stream, un) =>{
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal, un })
    })

    return peer;
  }

  const addPeer = (incomingSignal, callerID, stream) =>{
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);

    return peer;

  }

  return (
    <div className='room-container'>
      <div className="video-chat-container" >
        <div className='video-controls-container' >
          <VideoPlayer peers={peers} userVideo={userVideo} />
          <VideoControls
            {...props}
            stream={stream}
            setToggleParticipants={setToggleParticipants}
            toggleParticipants={toggleParticipants}
            setToggleChat={setToggleChat}
            toggleChat={toggleChat}
          />
        </div>
        { toggleParticipants || toggleChat ?
          <div className='chat-users-container' >
            {toggleParticipants ? <Participants users={users} /> : null}
            {toggleChat ? <Chat /> : null}
          </div>
          :
          null
        }
      </div>
    </div>
  );
};

export default Room;
