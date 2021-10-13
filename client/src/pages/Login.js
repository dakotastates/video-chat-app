import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm =  e => {
    e.preventDefault();
    console.log('Login Clicked', email, password)
  };

  return (
    <div className="d-flex flex-column container ">
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => onChange(e)}
            className="form-control input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
            className="form-control input"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm submit">Sign In</button>
      </form>

      <h7>Need an account?</h7>
      <Link className="btn btn-secondary btn-sm signup-btn" to="/register">Register</Link>
      <Link className="btn btn-secondary btn-sm back-btn " to="/">Back</Link>
    </div>
  );
};

export default Login;

// <label for="exampleInputEmail1">Email address</label>
// <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
// <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
