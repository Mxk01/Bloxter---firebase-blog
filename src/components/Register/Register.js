import React, { useState } from 'react'
import './Register.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";

import { updateProfile, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';


function Register() {
    let history = useHistory();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('')
    let [name, setName] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let register = (e) => {
        e.preventDefault();
        console.log(email, password);

        let auth = getAuth();
        // creates account only with email and password
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            if (user && confirmPassword === password) {
                console.log(user.userCredentials)
                // update profile
                updateProfile(auth.currentUser, { displayName: name });
                history.push('/login');
            }

        })

    }
    return (
        <div className="register__container">
            <form className="register__form" onSubmit={(e) => register(e)}>
                <label htmlFor="">Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="">Email</label>

                <input type="text" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="">Password</label>


                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="">Password Confirm</label>

                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button>Submit</button>
                <Link style={{
                    textDecoration: 'none',
                    color: 'white'
                }} to="/login">Already have an account?</Link>
            </form>
        </div>
    )
}

export default Register
