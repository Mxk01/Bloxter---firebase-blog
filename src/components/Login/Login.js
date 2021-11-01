import React, { useState } from 'react'
import './Login.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


function Login() {
    let auth = getAuth();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('')
    let history = useHistory();

    let login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then((user) => {
            let token = user._tokenResponse.idToken;

            localStorage.setItem('token', token);
            // ._tokenResponse.idToken
            history.push('/')

        }).catch(e => console.log(e))
    }
    return (
        <div className="login__container">
            <form className="login__form" onSubmit={(e) => login(e)}>
                <label htmlFor="">Email</label>

                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="">Password</label>

                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button>Submit</button>
                <Link style={{
                    textDecoration: 'none',
                    color: 'white'
                }} to="/register">Don't have an account?</Link>
            </form>
        </div>
    )
}

export default Login

