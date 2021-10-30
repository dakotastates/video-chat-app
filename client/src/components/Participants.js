import React from "react";

const Participant = (props) => {

  return(
    <div>
      <h6>User-${props.participant.substring(0,8)}</h6>
    </div>
  )

}

const Participants = (props) => {


  return (
    <div className='participants-container'>
      <h6>Participants </h6>
      {props.participants.map(participant =>{
        return <Participant key={participant} participant={participant} />
      })}
    </div>
  );
};

export default Participants;
