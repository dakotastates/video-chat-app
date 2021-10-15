import React, { useEffect, useState } from "react";
import '../styles/Dashboard.css';
import Nav from '../components/Nav'
import Clock from '../components/Clock'



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
        <div className="dash-left">
          <div className="left-container">
            <div className="row no-gutters">
              <div className="col">
                <div className='left-button'>
                  <div className='button-image new-meeting'>
                    <i className="fas fa-video"></i>
                  </div>
                  <span>New Meeting</span>
                </div>
              </div>
              <div className="col">
                <div className='left-button'>
                  <div className='button-image'>
                    <i className="fas fa-plus"></i>
                  </div>
                  <span>Join</span>
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <div className='left-button'>
                  <div className='button-image'>
                    <i className="fas fa-calendar"></i>
                  </div>
                  <span>Schedule</span>
                </div>
              </div>
              <div className="col">
                <div className='left-button'>
                  <div className='button-image'>
                    <i className="fas fa-arrow-up"></i>
                  </div>
                  <span>Share Screen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-right">
          <div className='right-container'>
            <div className='clock-container'>
              <Clock />
            </div>
            <div className='schedule-container'>
              No upcoming meetings today
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;


// <button onClick={e => logout(e)} className="btn btn-primary">
//   Logout
// </button>
