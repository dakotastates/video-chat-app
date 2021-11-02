import React from "react";

const Participant = (props) => {

  let participant;
  if (props.participant.username){
    participant = props.participant.username
  } else {
    participant = `User - ${props.participant.id.substring(0,8)}`
  }

  return(
    <div className='participant-list-item'>
      <h6>{participant}</h6>
    </div>
  )

}



const Participants = (props) => {



  return (
    <div className='list-group participants-container'>
      <h6>Participants </h6>
      {props.participants.map(participant =>{
        return <Participant key={participant} participant={participant} />
      })}
    </div>
  );
};

export default Participants;
