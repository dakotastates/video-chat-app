import React, {useState} from 'react'
import { Link} from "react-router-dom";

const Register = () =>{

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  })

  const {email, password, name} = inputs

  const onChange = (e) =>{
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = (e) =>{
    e.preventDefault()
    console.log('Register Clicked', email, password, name)
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => onChange(e)}
        />
        <button>Register</button>
      </form>
      <Link to="/login">login</Link>
    </div>
  )
}

export default Register;
