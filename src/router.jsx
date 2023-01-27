import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import WorkoutLog from "./views/WorkoutLog.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuessLayout from "./components/GuessLayout.jsx";
import WorkoutForm from "./views/WorkoutForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/workout"/>
      },
      {
        path: "/workout",
        element: <WorkoutLog/>
      },
      {
        path: "/workout/new",
        element: <WorkoutForm key="workoutCreate"/>
      },
      {
        path: "/workout/:id",
        element: <WorkoutForm key="workoutUpdate"/>
      }
    ]
  },
  {
    path: "/",
    element: <GuessLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])


export default router;
