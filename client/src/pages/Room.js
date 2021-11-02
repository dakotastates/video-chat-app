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
import { useLocation } from "react-router-dom";



const videoConstraints = {
    height: window.innerHeight,
    width: window.innerWidth,
    aspectRatio: 1.777777778
};

const Room = (props) => {
  const location = useLocation();

  const [peers, setPeers] = useState([]);
  const [toggleChat, setToggleChat] = useState(false)
  const [toggleParticipants, setToggleParticipants] = useState(false)
  const [stream, setStream] = useState(null)
  const [participants, setParticipants] = useState([])
  const [username, setUsername] = useState(location.state ? location.state.name : null)

  const [messages, setMessages] = useState()



  // const [toggleVideo, setToggleVideo] = useState(true)

  const socketRef = useRef();
  const peersRef = useRef([]);
  const userVideo = useRef();
  const participantsRef = useRef([]);

  const roomID = props.match.params.roomID;


  // const generateUsername = () =>{
  //   // console.log(location.state)
  //
  //   let name;
  //   if (location.state){
  //    name = location.state.name
  //  } else{
  //    // name =
  //    const id = uuid();
  //    name = `user-${id}`
  //  }
  //   // debugger
  //    setUsername(name)
  //
  //   // debugger
  // }

// debugger
 //  useEffect(()=>{
 //
 //   // generateUsername()
 //   // const name = location.state
 //   // setUsername(username => ({ ...username, name }));
 //   // console.log('username', username)
 // },[])


  useEffect(()=>{
      socketRef.current = io('http://localhost:4000');

      navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
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
            users.forEach(user => {
              // debugger
              // console.log(userID.id)
              const peer = createPeer(user.id, socketRef.current.id, stream);
              peersRef.current.push({
                  peerID: user.id,
                  peer
              })
              peers.push({
                peerID : user.id,
                peer
              });

            })
            setPeers(peers);
        })

        // Listen for New Peers

        socketRef.current.on("user joined", payload => {
          // console.log('user joined', payload)
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


        // // All participants

        socketRef.current.on("participants", prts => {
          // participantsRef.current.push(prts)
          participantsRef.current = prts

          setParticipants(prts)
        })

        // Chat Messages

        socketRef.current.on('messages', msgs =>{
          setMessages(msgs);
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


  useEffect(()=>{
    // User Left

    socketRef.current.on('user left', id => {
      console.log('participants left:', participants)
      const peerObj = peersRef.current.find(p => p.peerID === id);
      if (peerObj) {
        peerObj.peer.destroy()

      }
      const peers = peersRef.current.filter(p => p.peerID !== id);
      peersRef.current = peers;
      setPeers(peers);


      // const prtcpnts = participantsRef.current[0].filter(p => p.id !== id);
      const prtcpnts = participantsRef.current.filter(p => p.id !== id);

      // console.log("participants", prtcpnts)
      // console.log('after', participants)

      setParticipants(prtcpnts);

    })
  }, [])

  console.log('participants:', participants)

  return (
    <div className='room-container'>
      <div className="video-chat-container" >
        <div className='video-controls-container' >
          <VideoPlayer
            peers={peers}
            userVideo={userVideo}
          />
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
            {toggleParticipants ? <Participants
              participants={participants}
            /> : null}
            {toggleChat ? <Chat
              socketRef={socketRef}
              roomID={roomID}
              username={username}
              messages={messages}
            /> : null}
          </div>
          :
          null
        }
      </div>
    </div>
  );
};

export default Room;
