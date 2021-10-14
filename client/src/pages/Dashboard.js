import React, { useEffect, useState } from "react";
import '../styles/Dashboard.css';
import Nav from '../components/Nav'



const Dashboard = (props) => {
  const [state, setState] = useState({
    id: "",
    name: ""
  });


  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setState({
        id: parseData.id,
        name: parseData.name
      })

    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    getProfile();
  }, []);


  const logout = async e => {

    e.preventDefault()
    debugger
    try {
      localStorage.removeItem("token");
      props.setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };



  return (
    <div className='dash-container'>
      <div className='dash-nav'><Nav name={state.name} /></div>
      <div className='dash-main-container'>
        <div className="dash-left">Left</div>
        <div className="dash-right">Right</div>
      </div>

    </div>
  );
};

export default Dashboard;


// <button onClick={e => logout(e)} className="btn btn-primary">
//   Logout
// </button>
