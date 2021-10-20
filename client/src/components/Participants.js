import React from "react";

const Participants = (props) => {

  return (
    <div className='participants-container'>
      <h4>Participants </h4>
      {props.users.length > 0 ? 'users' : 'no users'}
    </div>
  );
};

export default Participants;
