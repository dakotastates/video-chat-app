import React, { useState } from "react";

const Join = () => {
  const [inputs, setInputs] = useState({
    roomId: "",
    name: ""
  });

  const { roomId, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });


    const onSubmitForm = e => {
      e.preventDefault();
      console.log('Join')
    };

  return (
    <div>
      <h1>Join</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="roomId"
          placeholder="RoomId"
          value={roomId}
          onChange={e => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => onChange(e)}
        />
        <button className="btn btn-success btn-block">Join</button>
      </form>


    </div>
  );
};

export default Join;
