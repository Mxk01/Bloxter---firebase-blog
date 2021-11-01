import React, { useState, useEffect } from 'react'
import './Container.css';
import { useHistory } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDB } from '../../utils/firebase'
import Typography from '@mui/material/Typography';
import { doc, deleteDoc } from "firebase/firestore";

import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'
function Container() {
    let db = getDB();
    let addedPosts = [];
    let [posts, setPosts] = useState([])
    let [user, setUser] = useState({});

    let history = useHistory()

    // detects when user logged in 

    useEffect(() => {
        let auth = getAuth()
        onAuthStateChanged(auth, (username) => {

            if (!username || !localStorage.getItem('token')) {
                history.push('/login')
            }
            else {
                setUser(username)
                // setPhoto(user.photoURL);
                console.log(user);
            }

        })
    }, [])


    let deleteItem = async (post) => {
        await deleteDoc(doc(db, "posts", post.uid))

    }

    let editItem = async (post) => {
        localStorage.setItem('postInfo', JSON.stringify({
            title: post.title,
            url: post.blogPhoto,
            description: post.description
            , uid: post.uid
        }))
        history.push('/edit-post')

    }



    useEffect(() => {
        let getPosts = async () => {
            if (user.uid) {
                const q = query(collection(db, "posts"), where("user", "==", user.uid))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    addedPosts.push({ ...doc.data(), uid: doc.id });

                });
                setPosts(addedPosts)

            }
            else {
                return;
            }
        }


        getPosts()
        // update posts whenever user changes
    }, [user, posts])




    return (
        <div className="main__container" style={{ overflowY: "scroll" }}>
            <div className="subsection">
                <div className="projects__container">
                    {
                        posts.length > 0 ? posts.map(post => (
                            <Card key={post.id} sx={{
                                maxWidth: '25vw', maxHeight: '44vh',
                                objectFit: "cover"
                            }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={post.blogPhoto}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">

                                        Posted by {user.displayName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.description}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button size="small"
                                        onClick={
                                            (e) => { deleteItem(post) }
                                        }>Delete</Button>

                                    <Button size="small"
                                        onClick={() => editItem(post)}>Edit</Button>
                                    <Button size="small">Read More</Button>
                                </CardActions>
                            </Card>)) : ('')

                    }









                </div>
            </div>
        </div>
    )
}

export default Container
