import React, { useState } from 'react'
import './Post.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { getDB } from '../../utils/firebase';
import { getAuth } from 'firebase/auth'
import { useHistory } from 'react-router';
import { collection, doc, query, where, deleteDoc, setDoc, getDocs } from '@firebase/firestore';
function Post() {
    let history = useHistory()
    let user = getAuth().currentUser;
    let db = getDB();
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [file, setFile] = useState('');
    let [blogPhoto, setBlogPhoto] = useState('')
    let createPost = (e) => {
        let postsRef = doc(collection(db, 'posts'));

        setDoc(postsRef, {
            title,
            description,
            file,
            blogPhoto,
            user: user.uid
        })


        history.push('/')
    }

    // console.log(JSON.parse(localStorage.removeItem('postInfo')).title);


    return (
        <div>
            <form

                className="post__form">
                <TextField

                    style={{ marginBottom: '1rem' }}
                    id="post__title" label="Post title" variant="outlined"

                    onChange={(e) => setTitle(e.target.value)}
                    required={true}
                />

                <TextField

                    style={{ marginBottom: '1rem' }}
                    id="post__title" label="Blog photo" variant="outlined"

                    onChange={(e) => setBlogPhoto(e.target.value)}
                    required={true}
                />


                <input type="file" id="post__img"
                    onChange={(e) => setFile(e.target.files[0].name)}
                    className="post__image" />
                <label className="image__label" htmlFor="post__img">
                    Upload Photo

                </label>

                <TextField
                    id="post__description"
                    label="Post Description"
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={5}

                    rowsMax={10}
                    required={true}

                />

                <Button variant="outlined" id="outlined-basic2"
                    onClick={(e) => createPost(e)}>Submit</Button>

            </form>
        </div >
    )
}

export default Post
