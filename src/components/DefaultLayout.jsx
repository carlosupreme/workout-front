import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

function DefaultLayout(props) {
  const {user, token, notification, setUser, setToken} = useStateContext();

  if (!token) return <Navigate to="/login"/>

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
      })
  };

  useEffect(() => {
    axiosClient.get("/user").then(({data}) => {
      setUser(data)
    })
  }, [])

  return (<div id="defaultLayout">
    <aside>
      <Link to="/">Dashboard</Link>
      <Link to="/workout">Workout log</Link>
    </aside>
    <div className="content">
      <header>
        <div>header</div>
        <div>
          {user.name}
          <a className="btn-logout" href="#" onClick={onLogout}>Log out</a>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>

    {notification && <div className="notification">
      {notification}
    </div>}
  </div>);
}

export default DefaultLayout;
