import React, { useState, createContext, useContext, useEffect } 
from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', '');
    const [userTokens, setUserTokens] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     async function getApi() {
    //         await axios({
    //             method: "post",
    //             url: "http://127.0.0.1:8000/api/getUsername/",
    //             data: {
    //                 username: currentUser,
    //             }
    //         })
    //         .then(() => console.log("Username successfully posted..."))
    //         .catch((err) => console.error(`ERROR: ${err}`));
    //     }

    //     getApi();
    // }, [currentUser]);

    function postUserToSession(uname) {  
        console.log("session running");
        console.log(uname)
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/getUsername/",
            data: {
                "username": uname,
            }
        })
        .then(() => console.log("Username successfully posted..."))
        .catch((err) => console.error(`ERROR: ${err}`));
    }

    let login = async (username, password) => {
        setError("");
        setLoading(true);
        try {
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/token/",
                data: {
                    username,
                    password,
                }
            })
    
            const data = await response.data;
            if (response.status === 200) {
                console.log("current user");
                console.log(`${data.access}`);
                setCurrentUser(jwtDecode(data.access));
                var username = jwtDecode(data.access).username
                setUserTokens(data);
                console.log(username)
            } else {
                console.error("Alert something went wrong");
            }
            console.log(data);
            postUserToSession(username);
            // error while calling this function
            
            setLoading(false);
        } catch (err) {
            setError("Login failed!");
            setLoading(false);
        }
    }

    let logout = () => {
        setError("");
        setCurrentUser(null);
        // postUserToSession(null);
    }

    const value = {
        currentUser,
        login,
        logout,
        error,
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}