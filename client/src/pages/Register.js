import React, {useState} from 'react'
import { Link} from "react-router-dom";

const Register = () =>{

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  })

  const {email, password, confirmPassword, name} = inputs

  const onChange = (e) =>{
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async e =>{
    e.preventDefault()
    try {
    const body = { email, password, name };
    const response = await fetch(
      "http://localhost:4000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
    const parseRes = await response.json();
  console.log(parseRes)

  } catch (err) {
    console.error(err.message)
  }
  }

  return (
    <div className="d-flex flex-column container ">

      <form onSubmit={onSubmitForm}>
        <h1>Sign Up</h1>

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e => onChange(e)}
            className="form-control input"
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => onChange(e)}
            className="form-control input"
          />
        </div>

        <button className="btn btn-primary btn-sm submit">Sign Up</button>
      </form>
        <h7>Already have an account?</h7>
        <Link className="btn btn-secondary btn-sm signup-btn" to="/login">Login</Link>
        <Link className="btn btn-secondary btn-sm back-btn " to="/">Back</Link>
    </div>
  )
}

export default Register;
