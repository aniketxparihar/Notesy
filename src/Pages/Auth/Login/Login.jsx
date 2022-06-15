import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/Auth-Context";
import { useTheme } from "../../../Context/Theme-Context";

const Login = () => {
  const {loginHandler } = useAuth();
   const { themeObject } = useTheme();
 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const testLoginHandler = () => {
    setEmail("test@gmail.com");
    setPassword("test");
    setRememberMe(true);
  };
  return (
    <div
      className="login__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="form__container">
        <header className="heading" style={{ color: themeObject.text }}>
          Login
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
              loginHandler({ email, password, rememberMe });
          }}
        >
          <div className="email">
            <label htmlFor="email__input" style={{ color: themeObject.text }}>
              Email Address
            </label>
            <input
              type="email"
              id="email__input"
              className="email__input txt-2xl "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label
              htmlFor="password__input"
              style={{ color: themeObject.text }}
            >
              Password
            </label>
            <input
              type="password"
              id="password__input"
              className="password__input txt-2xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="footer">
            <div className="rememberMe__container">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rememberMe"
              />
              <label htmlFor="rememberMe" style={{ color: themeObject.text }}>
                Remember Me
              </label>
            </div>

            {/* <Link to="/forgotpassword" className="forgotPassword">
              Forgot Password
            </Link> */}
          </div>
          <input type="submit" className="login__button" value="Login" />
          <input
            type="submit"
            className="login__button"
            value="Login with Test Credentials"
            onClick={testLoginHandler}
          />

          <div className="noaccount" style={{ color: themeObject.text }}>
            Don't have an account?
            <Link to="/signup" className="txt-4xl txt-yellow-400">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
