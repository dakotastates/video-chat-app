import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';


const Home = () => {


  return (

        <div className="d-flex flex-column container">
         <h1>Video Chat App</h1>
         <div className="p-2 "><Link to="/join" className="btn btn-primary button">Join a Meeting</Link></div>
         <div className="p-2 "><Link to="/login" className="btn btn-secondary button">Sign In</Link></div>
        </div>



  );
};



export default Home;
