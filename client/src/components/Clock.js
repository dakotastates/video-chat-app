import React, {useState, useEffect} from "react";

const Clock = (props) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timerID = setInterval(()=> tick(), 1000)

      return function cleanup() {
        clearInterval(timerID);
      };
  }, []);

  const tick = () =>{
    setDate(new Date())
  }

  return (
    <div>
      <h1>{date.toLocaleTimeString()}</h1>
      <h5>{date.toLocaleDateString()}</h5>
    </div>
  );
};

export default Clock;
