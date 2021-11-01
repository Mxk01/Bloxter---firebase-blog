import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'
import Post from './components/Post/Post'
import EditPost from './components/EditPost/EditPost'

import Container from './components/Container/Container'
import { initializeFirebase } from './utils/firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {

  initializeFirebase()
  let auth = getAuth();
  console.log(auth.currentUser);
  return (
    <Router>


      <Switch>
        <Route exact path="/">
          <div className="App">
            <Sidebar />
            <Container />
          </div>

        </Route>
        <Route exact path="/register">
          <div className="App">
            <Sidebar />

            <Register />
          </div>


        </Route>
        <Route exact path="/login">
          <div className="App">
            <Sidebar />

            <Login />
          </div>
        </Route>

        <Route exact path="/create-post">
          <div className="App">
            <Sidebar />

            <Post />
          </div>

        </Route>

        <Route exact path="/edit-post">
          <div className="App">
            <Sidebar />

            <EditPost />
          </div>

        </Route>

      </Switch>
    </Router>

  );
}

export default App;
