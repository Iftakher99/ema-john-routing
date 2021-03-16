import { useState } from "react";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";
import { UserContext } from "../../App";
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    password: "",
    email: "",
    photoURL: "",
    successful: false,
  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }

    const upDateUserName = (name) => {};

    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={fbSignIn}> Sign in using fb</button>
      {user.isSignedIn && (
        <div>
          {" "}
          <p>welcome, {user.name}</p>
          <p>{user.email}</p> <img src={user.photoURL} alt='' /> <p></p>
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <input
        type='checkbox'
        name='newUser'
        onChange={() => setNewUser(!newUser)}
        id=''
      />
      <label htmlFor='newUser'>Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            onBlur={handleBlur}
            type='text'
            name='name'
            placeholder='Your Name'
          />
        )}
        <br />
        <input
          type='text'
          name='email'
          onBlur={handleBlur}
          placeholder='Enter your email'
          required
        />
        <br />
        <input
          type='password'
          name='password'
          onBlur={handleBlur}
          placeholder='Enter your Password'
          required
        />
        <br />
        <input type='submit' value={newUser ? "Sign Up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.successful && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
