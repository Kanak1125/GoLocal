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
    //         const response = await axios({
    //             method: "get",
    //             url: "http://127.0.0.1:8000/api/token/",
    //         })
    
    //         const data = await response.data;
    //         // console.log(data);
    //         setCurrentUser(data);
    //     }

    //     getApi();

    // }, []);

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
                setCurrentUser(jwtDecode(data.access));
                setUserTokens(data);
            } else {
                console.error("Alert something went wrong");
            }
            console.log(data);
            setLoading(false);
        } catch (err) {
            setError("Login failed!");
            setLoading(false);
        }
    }

    let logout = () => {
        setCurrentUser(null);
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