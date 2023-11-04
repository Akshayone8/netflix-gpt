import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //this useState is used to change the from sign in to signup and vice versa from with  onCLick by defaut it will be sign in form.
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);
    if (message) return; //if message is there then reutrn it should not go to next line

    //if there are no error messgae from validata.js file then we will proceed
    //sign in / sign up logic
    if (!isSignInForm) {
      //sign up logic this codepsnippet we have taken from firebase website
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          //this updateProfile api is used to update user info
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse"); because all handled from onAuthStateChanged which is in header component
              // Profile updated!
              // ...
            })
            .catch((error) => {
              setErrorMessage(error.message);
              // An error occurred
              // ...
            });
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " ", errorMessage);
          // navigate("/");
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(errorCode, errorMessage);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  //with the help of below function we are able to change sign in to sign up and vice versa
  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img src={BG_URL} alt="login-background" />
      </div>
      <form
        className="absolute p-12  my-36 mx-auto left-0 right-0 w-3/12 text-white bg-black  bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Enter Your Name"
            className="p-4 my-4 w-full bg-gray-800"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-800"
        />
        <p className="text-red-500 font-bold p-1 text-lg">{errorMessage}</p>

        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInform}>
          {isSignInForm
            ? "New to Netflix ? Sign Up Now"
            : "Allready a User? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
