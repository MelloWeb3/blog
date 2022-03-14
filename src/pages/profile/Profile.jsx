import { useEffect, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from '../../firebase';
import { Avatar } from '@mui/material';
import { auth } from "../../firebase";
import "./profile.css";



export default function Profile() {

    const [profilePic, setProfilePic] = useState([]);
    const [url, setUrl] = useState(null);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
        })
    })

    const handleProfilePic = (e) => {
        if (e.target.files[0]) {
            setProfilePic(e.target.files[0])
        }
    }

    const handleSubmit = () => {
        const imageRef = ref(storage, user.uid + "profilePic.png");
        uploadBytes(imageRef, profilePic).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setUrl(url);
            }).catch(error => {
                    alert(error.message)
                }); setProfilePic(null)
        }).catch(error => {
                alert(error.message)
            });
    }

    return (
        <> { auth.currentUser ? <div className='profile'>
            <Avatar src={url} sx={{ width: 150, height: 150 }} />
            <input className='fileUpload' type="file" onChange={handleProfilePic} />
            <button type="submit" onClick={handleSubmit}> Submit </button>
        </div> : <p> You Are Not Signed In!</p> } </>
    )
}
