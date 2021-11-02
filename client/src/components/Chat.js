import React, {useState, useEffect} from "react";
import '../styles/Chat.css';


const Chat = (props) => {
  const [input, setInput] = useState({
    message: '',
    username: props.username,
  })
  // const [messages, setMessages] = useState()

  const { message, username } = input;

  const onChange = e =>
    setInput({ ...input, [e.target.name]: e.target.value });


    const onCreateMessage = async e => {
      e.preventDefault();
      const messageObj = {
        message: message,
        username: username,
      }

      try {
        props.socketRef.current.emit('message', messageObj );
        setInput({
          message: "",
          username: props.username,
          // roomID: props.roomID
        })

        // props.socketRef.current.on("messages", messages => {
        //   console.log(messages)
        // })
      } catch (err) {
        console.error(err.message);
      }
    };

    // useEffect(()=>{
    //   // props.socketRef.current.emit('message', 'message123' );
    //   props.socketRef.current.on('messages', msgs =>{
    //     console.log(msgs)
    //     // debugger
    //     // const msgObj={
    //     //   message: msg.message,
    //     //   username: msg.username
    //     // }
    //     // setMessages(messages => [...messages, msgs]);
    //     setMessages(msgs);
    //     // scrollToBottom()
    //
    //   })
    // },[])
    // console.log('messages', messages)
  return (
    <div className='chat-container'>
      <h6>Chat </h6>
      <div className={props.toggleParticipants ? 'messages-container active' : 'messages-container'}>

        {props.messages ? props.messages.map((message) => (
          message.username === props.username ? (
            <div className='reciever'>

              <div className='recieverText'>{message.message}</div>
            </div>
          ):(
            <div className='sender'>

              <div className='senderText'>{message.message}</div>
              <div className='senderName'>{message.username}</div>
            </div>
          )
        ))
        :
          null
        }

      </div>
      <div className='input-container'>
        <form onSubmit={onCreateMessage}>
          <input
            type='text'
            name='message'
            value={message}
            placeholder="Type message here..."
            onChange={e => onChange(e)}
          />
          <button type='submit'><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  );
};

export default Chat;


// {messages.map((message) =>{
//   return (
//   <div>
//   {message.message} - {message.username}
//   </div>
// )
// })}


// {props.messages ? props.messages.map((message) =>{
//   return (
//   <div>
//     <li>{message.message} - {message.username}</li>
//   </div>
//   )
// })
//   : null
// }






// {props.messages.map(({id, message}) => (
//   message.id === props.currentUser.id ? (
//     <div key={id} className='reciever'>
//
//       <div className='recieverText'>{message.message}</div>
//     </div>
//   ):(
//     <div className='sender'>
//
//       <div className='senderText'>{message.message}</div>
//       <div className='senderName'>{message.username}</div>
//     </div>
//   )
// ))}






// {props.messages ? props.messages.map((message) =>{
//
//   if (message.id === props.currentUser.id){
//     return (
//      <div>
//       <li>{message.message} - {message.username} you</li>
//      </div>
//     )
//   } else{
//     return (
//       <div>
//        <li>{message.message} - {message.username} someone else</li>
//       </div>
//     )
//   }
//
// })
//   : null
// }

// <div className='messages-container'>
