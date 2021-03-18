
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    displayName: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
        }
        setUser(signOutUser);
      })
      .catch(err => {
      })
  }
  const handleChange = (e) => {
    if(e.target.name === 'email') {
      const isEmailValid =/\S+@\S+\.\S+/.test(e.target.value);
      console.log(isEmailValid)
    }
  
    console.log(e.target.name , e.target.value)
  }
  const handleSubmit = () => {

  }

  return (
    <div className="App">

      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn &&
        <div>
          <h3>Welcome, {user.name} </h3>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />

        </div>
      }
      <h1>Our own Authentication</h1>
    <form onSubmit={handleSubmit}>
    <input type="text" onChange={handleChange} name="name" placeholder="Your Email Address" required /> 
    <br/>
    <input type="password" onChange={handleChange} name="password" placeholder="Password" required />
    <br/>
    <input type="submit" value="Submit"/>
    </form>

    </div>
  );
}

export default App;
