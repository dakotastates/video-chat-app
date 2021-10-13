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
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => onChange(e)}
        />
        <button class="btn btn-success btn-block">Login</button>
      </form>
      <Link to="/register">register</Link>
    </div>
  );
};

export default Login;
