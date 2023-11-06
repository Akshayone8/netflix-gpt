import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { emptySearchResult } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    //we are doing this for authentication and setting up of our store
    //this hook given by firebase u can find it in documentation
    //this hook is used to update the store i.e if the user signup/sign in  then this hook will be called or sign out this hook wil be called

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        //above we are dispatch an action called addUser
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

        // ...
      }
    });
    //unsubscribe when header component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    //toggle search
    dispatch(toggleGptSearchView());
    dispatch(emptySearchResult());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="md:mx-0 w-44 mx-auto" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex justify-between items-center">
          {showGpt && (
            <select
              className="bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 m-2 bg-red-500 text-white rounded-3xl"
            onClick={handleGptSearchClick}
          >
            {showGpt ? "HomePage" : "GPT Search"}
          </button>
          <img
            className="w-8 h-8 hidden md:block"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button className="font-bold text-red-500" onClick={handleSignOut}>
            Sing Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
