import React, { useReducer } from "react";
import { useAuth } from "../../../Context/Auth-Context";
import { useTheme } from "../../../Context/Theme-Context";

const Signup = () => {
    const { signupHandler } = useAuth();
    const { themeObject } = useTheme();
    const signupReducerFunc = (state, action) => {
    switch (action.type) {
      case "FIRST_NAME":
        return { ...state, firstName: action.payload };
      case "LAST_NAME":
        return { ...state, lastName: action.payload };
      case "EMAIL":
        return { ...state, email: action.payload };
      case "PASSWORD":
        return { ...state, password: action.payload };
      case "TERMS_AND_CONDITION":
        return { ...state, termsAndCondition: !state.termsAndCondition };
    }
  };

  const [state, dispatch] = useReducer(signupReducerFunc, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAndCondition: false,
  });

  return (
    <div
      className="signup__container"
      style={{ backgroundColor: themeObject.primary }}
    >
      <div className="form__container">
        <header className="heading" style={{ color: themeObject.text }}>
          Signup
        </header>
        <form onSubmit={(e) => { e.preventDefault(); signupHandler(state.firstName,state.lastName,state.email,state.password)}}>
          <div className="first_name">
            <label
              htmlFor="first_name__input"
              style={{ color: themeObject.text }}
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name__input"
              className="first_name__input txt-2xl"
              value={state.firstName}
              onChange={(e) =>
                dispatch({ type: "FIRST_NAME", payload: e.target.value })
              }
            />
          </div>
          <div className="last_name">
            <label
              htmlFor="last_name__input"
              style={{ color: themeObject.text }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name__input"
              className="last_name__input txt-2xl"
              value={state.lastName}
              onChange={(e) =>
                dispatch({ type: "LAST_NAME", payload: e.target.value })
              }
            />
          </div>
          <div className="email">
            <label
              htmlFor="email__input"
              style={{ color: themeObject.text }}
            >
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

          <div id="footer">
            <div id="termsAndCondition__container">
              <input
                type="checkbox"
                id="termsAndCondition"
                className="termsAndCondition"
                onChange={(e) =>
                  dispatch({
                    type: "TERMS_AND_CONDITION",
                    payload: e.target.value,
                  })
                }
                checked={state.termsAndCondition}
              />
              <label
                htmlFor="termsAndCondition"
                style={{ color: themeObject.text }}
              >
                I Accept all Terms and Condition
              </label>
            </div>
          </div>
          <input
            className="signup__button"
            type="submit"
            value="create new account"
            disabled={
              state.termsAndCondition === false ||
              state.fullName === "" ||
              state.email === "" ||
              state.password === ""
            }
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
