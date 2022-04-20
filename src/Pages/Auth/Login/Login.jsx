import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/Auth-Context";
import { useTheme } from "../../../Context/Theme-Context";

const Login = () => {
  const {  loginHandler } = useAuth();
    const { themeObject } = useTheme();
  const loginReducerFunc = (state, action) => {
    switch (action.type) {
      case "EMAIL":
        return { ...state, email: action.payload };
      case "PASSWORD":
        return { ...state, password: action.payload };
      case "REMEMBER_ME":
        return { ...state, rememberMe: !state.rememberMe };
    }
  };

  const [state, dispatch] = useReducer(loginReducerFunc, {
    email: "test@gmail.com",
    password: "test",
    rememberMe: true,
  });
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
            loginHandler(state);
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
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "EMAIL", payload: e.target.value })
              }
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
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <div className="footer">
            <div className="rememberMe__container">
              <input
                type="checkbox"
                id="rememberMe"
                checked={state.rememberMe}
                onChange={() => {
                  dispatch({ type: "REMEMBER_ME" });
                }}
                className="rememberMe"
              />
              <label
                htmlFor="rememberMe"
                style={{ color: themeObject.text }}
                onClick={() => {
                  dispatch({ type: "REMEMBER_ME" });
                }}
              >
                Remember Me
              </label>
            </div>

            <Link to="/forgotpassword" className="forgotPassword">
              Forgot Password
            </Link>
          </div>
          <input type="submit" className="login__button" value="Login" />

          <div className="noaccount" style={{ color: themeObject.text }}>
            Don't have an account?
            <Link to="/signup" className="txt-4xl txt-yellow-400">
              {" "}
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
