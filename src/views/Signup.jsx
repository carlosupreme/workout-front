import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function Signup(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmationRef = useRef();
  const {setUser, setToken} = useStateContext();
  const [errors, setErrors] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmationRef.current.value
    }

    axiosClient.post("/signup", payload).then(({data}) => {
      setUser(data.user);
      setToken(data.token);
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422)
        setErrors(response.data.errors)
    })
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Sign up for free</h1>
          {errors &&
            <div className="alert">
              { Object.keys(errors).map(e => (
                <p key={e}>{errors[e][0]}</p>
              )) }
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <input ref={confirmationRef} type="password" placeholder="Password confirmation"/>
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
