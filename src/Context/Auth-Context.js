import React, { useContext, createContext, useState,useEffect } from "react";
import axios from "axios";
const defaultValue = {};
const AuthContext = createContext(defaultValue);
const AuthProvider = (props) => {
    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            tokenHandler(JSON.parse(localStorage.getItem("user")).encodedToken);
            userHandler(JSON.parse(localStorage.getItem("user")).foundUser)
        }
    }, []);

    const [authToken, setAuthToken] = useState("");
    const [user, setUser] = useState({});

    const tokenHandler = (value) => {
        setAuthToken(value);
    }
    const userHandler = (value) => {
        setUser(value);
    }

    const loginHandler = async ({email,password,rememberMe}) => {
        
        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password
            });
            if (response.status === 200) {
                userHandler(response.data.foundUser);
                tokenHandler(response.data.encodedToken);
                if(rememberMe===true)
                localStorage.setItem("user", JSON.stringify(response.data));}
        }
        catch (err) {
                console.log(err);
        }
        
    }
    
    const signupHandler = async (firstName, lastName, email, password) => {
        try {
            const response = await axios.post("/api/auth/signup", {
                firstName,
                lastName,
                email,
                password
            });
            if (response.status === 201) {
                console.log(response)
                userHandler(response.data.user);
                tokenHandler(response.data.encodedToken);
                localStorage.setItem("user", JSON.stringify(response.data))}
        }
        catch (err) {
                console.log(err);
        }
        
    }

    return (
        <AuthContext.Provider value={{ authToken, user,loginHandler,signupHandler,tokenHandler }} >
            {props.children}
        </AuthContext.Provider>
            
    )
}
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
