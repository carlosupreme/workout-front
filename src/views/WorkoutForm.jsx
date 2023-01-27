import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function WorkoutForm(props) {
  const {id} = useParams();
  const navigate = useNavigate();
  const {setNotification} = useStateContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [workout, setWorkout] = useState({
    id: null,
    name: '',
    date: '',
    time_start: '',
    time_end: ''
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get('/workout/' + id).then(({data}) => {
        setWorkout(data);
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }, [])
  }


  const onSubmit = (e) => {
    e.preventDefault();
    if (workout.id) {
      axiosClient.put(`/workout/${workout.id}`, workout)
        .then(() => {
          setNotification("Workout updated successfully")
          navigate('/workout');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422)
            setErrors(response.data.errors)
        })
    } else {
      axiosClient.post('/workout', workout)
        .then(() => {
          setNotification("Workout created successfully")
          navigate('/workout');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422)
            setErrors(response.data.errors)
        })
    }

  };


  return (
    <>
      {workout.id && <h1>Update workout {workout.name}</h1>}
      {!workout.id && <h1>Create workout</h1>}
      <div className="animated card fadeInDown">
        {loading && (<div className="text-center">Loading...</div>)}

        {errors &&
          <div className="alert">
            {Object.keys(errors).map(e => (
              <p key={e}>{errors[e][0]}</p>
            ))}
          </div>
        }
        {
          !loading && (
            <form onSubmit={onSubmit}>
              <input
                onChange={e => setWorkout({...workout, name: e.target.value})}
                value={workout.name}
                type="text"
                placeholder="name"
              />
              <input onChange={e => setWorkout({...workout, date: e.target.value})} value={workout.date} type="date"
                     placeholder="date"/>
              <input onChange={e => setWorkout({...workout, time_start: e.target.value})} value={workout.time_start}
                     type="text"
                     placeholder="time start"/>
              <input onChange={e => setWorkout({...workout, time_end: e.target.value})} value={workout.time_end}
                     type="text"
                     placeholder="time end"/>

              <button type="submit" className="btn">save</button>
            </form>
          )
        }

      </div>
    </>
  );
}

export default WorkoutForm;
