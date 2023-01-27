import React, {useEffect, useState} from 'react';
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function WorkoutLog(props) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = () => {
    setLoading(true)
    axiosClient.get("/workout")
      .then(({data}) => {
        setLoading(false)
        setWorkouts(data.data);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  function onDelete(w) {
    // TODO
    if (!window.confirm("Delete? id=" + w.id)) return

    axiosClient.delete("/workout/" + w.id).then(() => {
      setNotification("Workout deleted successfully")
      getWorkouts();
    })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Workouts</h1>
        <Link to="/workout/new" className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time start</th>
            <th>Time end</th>
            <th>actions</th>
          </tr>
          </thead>
          {loading && <tbody>
          <tr>
            <td colSpan="5" className="text-center">Loading...</td>
          </tr>
          </tbody>}
          {!loading && <tbody>
          {
            workouts.map(w => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>{w.date}</td>
                <td>{w.time_start}</td>
                <td>{w.time_end}</td>
                <td>
                  <Link className="btn-edit" to={'/workout/' + w.id}>Edit</Link>
                  &nbsp;
                  <button onClick={e => onDelete(w)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
          }
        </table>
      </div>
    </div>
  );
}

export default WorkoutLog;
